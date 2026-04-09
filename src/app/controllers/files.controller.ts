import { basename, relative } from 'path';
import {
  commands,
  FileType,
  l10n,
  Position,
  Range,
  Uri,
  WorkspaceEdit,
  window,
  workspace,
} from 'vscode';

import { ExtensionConfig } from '../configs';
import {
  findFiles,
  readFileContent,
  relativePath,
  saveFile,
  sortExports,
  toPosixPath,
} from '../helpers';
import { SortModel } from '../models/sort.model';

/**
 * Controller responsible for generating and updating barrel files.
 */
export class FilesController {
  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Initializes a new instance of the FilesController.
   *
   * @param config - The active extension configuration.
   *
   * @memberof FilesController
   *
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   */
  constructor(readonly config: ExtensionConfig) {}

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods

  /**
   * Creates a new barrel file in the specified folder.
   *
   * @param targetFolderUri - The URI of the folder where the barrel will be created.
   *
   * @remarks
   * If a barrel file already exists in the target folder, it will be overwritten without warning.
   * Ensure that you have a backup of any existing barrel file before running this command.
   * After creation, the new barrel file will be opened in the editor for review.
   * If the target folder is invalid or not part of the workspace, an error message will be shown.
   *
   * @memberof FilesController
   *
   * @example
   * const targetFolderUri = Uri.file('/path/to/your/folder');
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * const filesController = new FilesController(config);
   * filesController.createBarrel(targetFolderUri);
   */
  async createBarrel(targetFolderUri?: Uri): Promise<void> {
    const { defaultLanguage, configuredDefaultFilename } = this.config;

    if (!this.validateWorkspaceUri(targetFolderUri)) {
      return;
    }

    const folderPath = targetFolderUri!.fsPath;
    const barrelContent = await this.getBarrelContent(targetFolderUri!);

    const fileExtension = defaultLanguage === 'TypeScript' ? 'ts' : 'js';
    const outputFileName = `${configuredDefaultFilename}.${fileExtension}`;

    if (barrelContent) {
      void saveFile(folderPath, outputFileName, barrelContent, this.config);
    }
  }

  /**
   * Updates an existing barrel file in the specified folder.
   * If the barrel file does not exist, an error message is shown (unless in silent mode).
   *
   * @param targetFolderUri - The URI of the folder containing the barrel file.
   *
   * @remarks
   * The method looks for a barrel file with the configured default name and appropriate extension in the target folder.
   * If the file is found, it will be updated with new content based on the current state of the folder.
   * If the file does not exist, an error message will be displayed to the user (unless silent mode is enabled).
   * After updating, the barrel file will be opened in the editor for review.
   *
   * @memberof FilesController
   *
   * @example
   * const targetFolderUri = Uri.file('/path/to/your/folder');
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * const filesController = new FilesController(config);
   * filesController.updateBarrelInFolder(targetFolderUri);
   */
  async updateBarrelInFolder(targetFolderUri?: Uri): Promise<void> {
    const { defaultLanguage, configuredDefaultFilename } = this.config;

    if (!this.validateWorkspaceUri(targetFolderUri)) {
      return;
    }

    const fileExtension = defaultLanguage === 'TypeScript' ? 'ts' : 'js';
    const outputFileName = `${configuredDefaultFilename}.${fileExtension}`;

    const targetBarrelFileUri = Uri.joinPath(targetFolderUri!, outputFileName);

    try {
      const fileStat = await workspace.fs.stat(targetBarrelFileUri);

      if ((fileStat.type & FileType.File) === 0) {
        throw new Error('Target resource is not a file');
      }
    } catch {
      if (!this.config.silentMode) {
        const errorMessage = l10n.t(
          'The barrel file does not exist in the folder! Please create it first.',
        );
        window.showErrorMessage(errorMessage);
      }

      return;
    }

    await this.updateBarrel(targetBarrelFileUri).catch((error) => {
      console.error('Error updating barrel file:', error);
    });
  }

  /**
   * Updates a specific barrel file.
   *
   * @param targetFileUri - The URI of the barrel file to update.
   *
   * @remarks
   * This method performs a direct update on the specified barrel file URI.
   * It validates that the URI belongs to an active workspace folder before proceeding.
   * If the file is found and updated successfully, it will be opened in the editor.
   * If the URI is invalid or outside the workspace, an error message will be shown.
   *
   * @memberof FilesController
   *
   * @example
   * const targetFileUri = Uri.file('/path/to/your/folder/index.ts');
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * const filesController = new FilesController(config);
   * filesController.updateBarrel(targetFileUri);
   */
  async updateBarrel(targetFileUri?: Uri): Promise<void> {
    if (!this.validateWorkspaceUri(targetFileUri)) {
      return;
    }

    const filePath = targetFileUri!.fsPath;
    const folderDirectoryUri = Uri.joinPath(targetFileUri!, '..');

    const barrelContent = await this.getBarrelContent(folderDirectoryUri);

    if (barrelContent) {
      const textDocument = await workspace.openTextDocument(targetFileUri!);

      const workspaceEdit = new WorkspaceEdit();
      const startPosition = new Position(0, 0);
      const endPosition = new Position(textDocument.lineCount, 0);
      const fullDocumentRange = new Range(startPosition, endPosition);

      workspaceEdit.replace(textDocument.uri, fullDocumentRange, barrelContent);

      await workspace.applyEdit(workspaceEdit);

      await commands.executeCommand('workbench.action.files.saveAll');
      window.showTextDocument(textDocument);

      if (!this.config.silentMode) {
        const successMessage = l10n.t(
          'File updated successfully: {0}',
          filePath,
        );
        window.showInformationMessage(successMessage);
      }
    }
  }

  // Private methods

  /**
   * Validates if a given URI belongs to an active workspace folder.
   *
   * @param targetUri - The URI to validate.
   * @returns True if valid, false otherwise.
   *
   * @remarks
   * This method checks if the provided URI is defined and belongs to one of the currently open workspace folders.
   * If the URI is invalid or outside the workspace, it displays an appropriate error message to the user.
   *
   * @memberof FilesController
   *
   * @example
   * const targetUri = Uri.file('/path/to/your/folder');
   * const filesController = new FilesController(config);
   * const isValid = filesController.validateWorkspaceUri(targetUri);
   * console.log(isValid); // true if valid, false if not
   */
  private validateWorkspaceUri(targetUri?: Uri): boolean {
    if (!targetUri) {
      const invalidFolderMessage = l10n.t('The folder is not valid!');
      window.showErrorMessage(invalidFolderMessage);
      return false;
    }

    const workspaceFolder = workspace.getWorkspaceFolder(targetUri);

    if (!workspaceFolder) {
      const outsideWorkspaceMessage = l10n.t(
        'The folder is not in the workspace!',
      );
      window.showErrorMessage(outsideWorkspaceMessage);
      return false;
    }

    return true;
  }

  /**
   * Generates the content for a barrel file based on the target folder path.
   *
   * @param targetFolderPath - The absolute path to the folder.
   * @returns The generated barrel content, or undefined if no files were found.
   *
   * @remarks
   * This method performs the core logic of discovering files in the target folder, applying include/exclude patterns,
   * and generating export statements based on the file contents and extension configuration.
   * It also constructs a header comment if specified in the configuration.
   * If no matching files are found, it provides user feedback explaining whether the folder is empty or if files were filtered out.
   *
   * @memberof FilesController
   *
   * @example
   * const targetFolderPath = '/path/to/your/folder';
   * const filesController = new FilesController(config);
   * const barrelContent = await filesController.getBarrelContent(targetFolderPath);
   * console.log(barrelContent);
   */
  private async getBarrelContent(
    targetFolderUri: Uri,
  ): Promise<string | undefined> {
    const targetFolderPath = targetFolderUri.fsPath;

    // Extract configuration properties
    const {
      disableRecursiveBarrelling,
      includeExtensionOnExport,
      ignoreFilePathPatternOnExport,
      maxSearchRecursionDepth,
      supportsHiddenFiles,
      preserveGitignoreSettings,
      useSingleQuotes,
      excludeSemiColonAtEndOfLine,
      endOfLine,
      headerCommentTemplate,
      insertFinalNewline,
    } = this.config;

    const quoteCharacter = useSingleQuotes ? "'" : '"';
    const semicolonCharacter = excludeSemiColonAtEndOfLine ? '' : ';';
    const newlineCharacter = endOfLine === 'crlf' ? '\r\n' : '\n';

    const includePattern =
      includeExtensionOnExport.length === 1
        ? `**/*.${includeExtensionOnExport[0]}`
        : `**/*.{${includeExtensionOnExport.join(',')}}`;

    // Configure options for file discovery
    const findFilesOptions = {
      baseDirectoryPath: targetFolderPath,
      baseDirectoryUri: targetFolderUri,
      includeFilePatterns: [includePattern],
      excludedPatterns: ignoreFilePathPatternOnExport,
      disableRecursive: disableRecursiveBarrelling,
      maxRecursionDepth: maxSearchRecursionDepth,
      includeDotfiles: supportsHiddenFiles,
      enableGitignoreDetection: preserveGitignoreSettings,
    };

    // Retrieve candidate files
    const foundFiles = await findFiles(findFilesOptions);

    // If no matching files, explain why to the user
    if (foundFiles.length === 0) {
      const relativeFolderPath = await relativePath(
        targetFolderUri,
        true,
        this.config,
      );

      const allFilesInFolder = await workspace.findFiles(
        `${relativeFolderPath}/**/*`,
      );

      // Check if folder is completely empty or just filtered out
      if (allFilesInFolder.length === 0) {
        const emptyFolderMessage = l10n.t(
          'The {0} folder is empty!',
          relativeFolderPath,
        );
        window.showWarningMessage(emptyFolderMessage);
      } else {
        const noMatchesMessage = l10n.t(
          'No files found matching the specified patterns in the {0} folder! Please check the include and exclude files in the settings',
          relativeFolderPath,
        );
        window.showWarningMessage(noMatchesMessage);
      }

      return;
    }

    let barrelContent = '';

    barrelContent += this.buildHeaderComment(
      headerCommentTemplate,
      newlineCharacter,
    );

    const generatedExportLines = await this.generateExportLines(
      foundFiles,
      targetFolderPath,
      quoteCharacter,
      semicolonCharacter,
      this.config,
    );

    const sortedExportLines = sortExports(
      generatedExportLines,
      this.config.sortExports as SortModel,
    );

    barrelContent += sortedExportLines.join(newlineCharacter);

    // Add trailing newline if specified in config
    if (insertFinalNewline) {
      barrelContent += newlineCharacter;
    }

    return barrelContent;
  }

  /**
   * Constructs the header comment for the barrel file.
   *
   * @param headerLines - The array of lines forming the header.
   * @param newlineCharacter - The character sequence to use for newlines.
   * @returns The formatted header string.
   *
   * @remarks
   * This method takes an array of header lines and joins them into a single string with appropriate newlines.
   * If the headerLines array is empty, it returns an empty string.
   * The resulting header will be followed by two additional newlines to separate it from the export statements.
   *
   * @memberof FilesController
   *
   * @example
   * const headerLines = [
   *   'This barrel file was auto-generated.',
   *   'Do not edit this file directly.',
   * ];
   */
  private buildHeaderComment(
    headerLines: string[],
    newlineCharacter: string,
  ): string {
    if (headerLines.length > 0) {
      return headerLines.join(newlineCharacter) + newlineCharacter.repeat(2);
    }

    return '';
  }

  /**
   * Generates export statements for a list of target files.
   *
   * @param targetFiles - The files to inspect and export from.
   * @param baseFolderPath - The folder path to calculate relative imports.
   * @param quoteCharacter - The quote character to use in generated code.
   * @param semicolonCharacter - The semicolon character (or empty string).
   * @param extensionConfig - The active extension configuration.
   * @returns An array of generated export statement strings.
   *
   * @remarks
   * This method analyzes each target file to determine the appropriate export statements to generate.
   * It supports different export styles based on the presence of default exports, named exports, and bracketed exports.
   * The method also formats export names according to the configured naming style and handles file extensions based on settings.
   * If deep export detection is disabled, it defaults to a simple namespace export for each file.
   * The generated export statements are returned as an array of strings, which can then be sorted and joined to form the final barrel content.
   *
   * @memberof FilesController
   *
   * @example
   * const targetFiles = [Uri.file('/path/to/file1.ts'), Uri.file('/path/to/file2.ts')];
   * const baseFolderPath = '/path/to';
   * const quoteCharacter = '"';
   * const semicolonCharacter = ';';
   * const extensionConfig = new ExtensionConfig(workspace.getConfiguration());
   * const exportLines = await filesController.generateExportLines(
   *   targetFiles,
   *   baseFolderPath,
   *   quoteCharacter,
   *   semicolonCharacter,
   *   extensionConfig,
   * );
   * console.log(exportLines);
   */
  private async generateExportLines(
    targetFiles: Uri[],
    baseFolderPath: string,
    quoteCharacter: string,
    semicolonCharacter: string,
    extensionConfig: ExtensionConfig,
  ): Promise<string[]> {
    const {
      keepExtensionOnExport,
      detectExportsInFiles,
      useNamedExports,
      exportDefaultFilename,
    } = extensionConfig;

    const exportStatements: string[] = [];

    const defaultExportRegex =
      /\bexport\s*(?:async|function|const|let|var)?\s*default\s+/;
    const exportedMembersRegex = /\bexport\s*\{\s*([^}]*)\s*\}/g;
    const namedExportRegex =
      /\bexport\s+(?:(async|abstract|declare|const|let|var)\s*)?(enum|function|class|type|interface|const|let|var)\s+(\w+)\b/g;

    for (const currentFile of targetFiles) {
      let moduleRelativePath = toPosixPath(
        relative(baseFolderPath, currentFile.fsPath),
      );

      if (!keepExtensionOnExport) {
        moduleRelativePath = this.stripFileExtension(moduleRelativePath);
      }

      const moduleSpecifier = `${quoteCharacter}./${moduleRelativePath}${quoteCharacter}`;
      const wildcardExportLine = `export * from ${moduleSpecifier}${semicolonCharacter}`;

      if (!detectExportsInFiles) {
        exportStatements.push(wildcardExportLine);
        continue;
      }

      const fileBaseName = this.stripFileExtension(
        basename(currentFile.fsPath),
      );
      const formattedExportName = this.formatExportName(
        fileBaseName,
        exportDefaultFilename,
      );
      const namespaceExportLine = `export * as ${formattedExportName} from ${moduleSpecifier}${semicolonCharacter}`;

      const fileTextContent = await this.readFileContentSafely(currentFile);
      if (!fileTextContent) {
        exportStatements.push(wildcardExportLine);
        continue;
      }

      if (defaultExportRegex.test(fileTextContent)) {
        exportStatements.push(
          `export { default as ${formattedExportName} } from ${moduleSpecifier}${semicolonCharacter}`,
        );
        continue;
      }

      exportedMembersRegex.lastIndex = 0;
      const exportedMemberMatches = Array.from(
        fileTextContent.matchAll(exportedMembersRegex),
      );
      if (exportedMemberMatches.length > 0) {
        if (useNamedExports) {
          const extractedMembers = this.extractExportedMembers(
            exportedMemberMatches,
          );

          if (extractedMembers.length > 0) {
            const joinedExportNames = extractedMembers.join(', ');
            exportStatements.push(
              `export { ${joinedExportNames} } from ${moduleSpecifier}${semicolonCharacter}`,
            );
            continue;
          }
        } else {
          exportStatements.push(namespaceExportLine);
          continue;
        }
      }

      namedExportRegex.lastIndex = 0;
      const namedExportMatches = Array.from(
        fileTextContent.matchAll(namedExportRegex),
      );
      if (namedExportMatches.length > 0) {
        if (useNamedExports) {
          const { extractedTypeExports, extractedValueExports } =
            this.categorizeNamedInlineExports(namedExportMatches);

          if (
            extractedTypeExports.length > 0 ||
            extractedValueExports.length > 0
          ) {
            if (extractedValueExports.length === 0) {
              const joinedTypeExports = extractedTypeExports.join(', ');
              exportStatements.push(
                `export type { ${joinedTypeExports} } from ${moduleSpecifier}${semicolonCharacter}`,
              );
            } else if (extractedTypeExports.length === 0) {
              const joinedValueExports = extractedValueExports.join(', ');
              exportStatements.push(
                `export { ${joinedValueExports} } from ${moduleSpecifier}${semicolonCharacter}`,
              );
            } else {
              const combinedTypeAndValueExports = [
                ...extractedTypeExports.map(
                  (exportName) => `type ${exportName}`,
                ),
                ...extractedValueExports,
              ].join(', ');
              exportStatements.push(
                `export { ${combinedTypeAndValueExports} } from ${moduleSpecifier}${semicolonCharacter}`,
              );
            }

            continue;
          }
        } else {
          exportStatements.push(namespaceExportLine);
          continue;
        }
      }

      exportStatements.push(wildcardExportLine);
    }

    return exportStatements;
  }

  /**
   * Formats a given name according to the specified naming convention.
   *
   * @param originalName - The base file name or raw name.
   * @param namingStyle - The desired casing style (e.g., 'camelCase', 'pascalCase').
   * @returns The formatted name string.
   *
   * @remarks
   * This method transforms a given name into the specified naming convention by applying regex replacements.
   * It supports camelCase, PascalCase, kebab-case, and snake_case styles.
   * The original name is typically derived from the file name, and the method ensures that delimiters like dashes and dots are handled appropriately during formatting.
   *
   * @memberof FilesController
   *
   * @example
   * const originalName = 'my-file.name';
   * const namingStyle = 'camelCase';
   * const formattedName = filesController.formatExportName(originalName, namingStyle);
   * console.log(formattedName); // Outputs: 'myFileName'
   */
  private formatExportName(originalName: string, namingStyle: string): string {
    let formattedName = originalName;

    switch (namingStyle) {
      case 'camelCase':
        formattedName = formattedName.replace(
          /[-.](.)/g,
          (_, characterToUppercase) => characterToUppercase.toUpperCase(),
        );
        break;

      case 'pascalCase':
        formattedName = formattedName
          .replace(/[-.]\w/g, (matchedString) =>
            matchedString.charAt(1).toUpperCase(),
          )
          .replace(/^./, (matchedString) => matchedString.toUpperCase());
        break;

      case 'kebabCase':
        formattedName = formattedName.replace(
          /[-.](.)/g,
          (_, characterToKebab) => `-${characterToKebab}`,
        );
        break;

      case 'snakeCase':
        formattedName = formattedName.replace(
          /[-.](.)/g,
          (_, characterToSnake) => `_${characterToSnake}`,
        );
        break;
    }

    return formattedName;
  }

  private stripFileExtension(targetPath: string): string {
    return targetPath.replace(/\.[^./\\]+$/, '');
  }

  private async readFileContentSafely(
    fileUri: Uri,
  ): Promise<string | undefined> {
    try {
      return await readFileContent(fileUri);
    } catch (error) {
      console.warn('Failed to read file for export detection', error);
      return undefined;
    }
  }

  private extractExportedMembers(
    exportedMemberMatches: RegExpMatchArray[],
  ): string[] {
    const extractedMembers: string[] = [];
    const seenMembers = new Set<string>();

    for (const match of exportedMemberMatches) {
      const membersBlock = match[1];
      if (!membersBlock) {
        continue;
      }

      for (const memberName of membersBlock.split(',')) {
        const trimmedMemberName = memberName.trim();
        if (!trimmedMemberName || seenMembers.has(trimmedMemberName)) {
          continue;
        }

        seenMembers.add(trimmedMemberName);
        extractedMembers.push(trimmedMemberName);
      }
    }

    return extractedMembers;
  }

  private categorizeNamedInlineExports(
    namedExportMatches: RegExpMatchArray[],
  ): {
    extractedTypeExports: string[];
    extractedValueExports: string[];
  } {
    const extractedTypeExports: string[] = [];
    const extractedValueExports: string[] = [];
    const seenTypeExports = new Set<string>();
    const seenValueExports = new Set<string>();

    for (const match of namedExportMatches) {
      const exportTypeKeyword = match[2];
      const exportName = match[3];

      if (!exportTypeKeyword || !exportName) {
        continue;
      }

      if (exportTypeKeyword === 'interface' || exportTypeKeyword === 'type') {
        if (seenTypeExports.has(exportName)) {
          continue;
        }

        seenTypeExports.add(exportName);
        extractedTypeExports.push(exportName);
      } else {
        if (seenValueExports.has(exportName)) {
          continue;
        }

        seenValueExports.add(exportName);
        extractedValueExports.push(exportName);
      }
    }

    return { extractedTypeExports, extractedValueExports };
  }
}
