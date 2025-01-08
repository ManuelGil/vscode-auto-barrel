import * as fastGlob from 'fast-glob';
import {
  access,
  existsSync,
  mkdirSync,
  open,
  readFileSync,
  writeFile,
} from 'fs';
import ignore from 'ignore';
import { basename, dirname, join, relative } from 'path';
import {
  Position,
  Range,
  Uri,
  WorkspaceEdit,
  commands,
  l10n,
  window,
  workspace,
} from 'vscode';

import { ExtensionConfig } from '../configs';

/**
 * The FilesController class.
 *
 * @class
 * @classdesc The class that represents the list files controller.
 * @export
 * @public
 * @property {ExtensionConfig} config - The configuration object
 * @example
 * const controller = new FilesController(config);
 */
export class FilesController {
  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the FilesController class
   *
   * @constructor
   * @param {ExtensionConfig} config - The configuration object
   * @public
   * @memberof FilesController
   */
  constructor(readonly config: ExtensionConfig) {}

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods

  /**
   * The createBarrel method.
   *
   * @function createBarrel
   * @param {Uri} [folderPath] - The path to the folder
   * @public
   * @async
   * @memberof FilesController
   * @example
   * controller.createBarrel();
   *
   * @returns {Promise<void>} - The promise with no return value
   */
  async createBarrel(folderPath?: Uri): Promise<void> {
    // If the folder is not valid, return
    if (!folderPath) {
      const message = l10n.t('The folder is not valid!');
      window.showErrorMessage(message);
      return;
    }

    const workspaceFolder = workspace.getWorkspaceFolder(folderPath);

    // If the folder is not in the workspace, return
    if (!workspaceFolder) {
      const message = l10n.t('The folder is not in the workspace!');
      window.showErrorMessage(message);
      return;
    }

    const content = await this.getContent(folderPath.fsPath);

    const ext =
      this.config.defaultLanguage.toLowerCase() === 'typescript' ? 'ts' : 'js';

    const configuredDefaultFilename = this.config.configuredDefaultFilename;

    const filename = `${configuredDefaultFilename}.${ext}`;

    if (content) {
      this.saveFile(folderPath.fsPath, filename, content);
    }
  }

  /**
   * The updateBarrelInFolder method.
   *
   * @function updateBarrelInFolder
   * @param {Uri} [folderPath] - The path to the folder
   * @public
   * @async
   * @memberof FilesController
   * @example
   * controller.updateBarrelInFolder();
   *
   * @returns {Promise<void>} - The promise with no return value
   */
  async updateBarrelInFolder(folderPath?: Uri): Promise<void> {
    // If the folder is not valid, return
    if (!folderPath) {
      const message = l10n.t('The folder is not valid!');
      window.showErrorMessage(message);
      return;
    }

    const workspaceFolder = workspace.getWorkspaceFolder(folderPath);

    // If the folder is not in the workspace, return
    if (!workspaceFolder) {
      const message = l10n.t('The folder is not in the workspace!');
      window.showErrorMessage(message);
      return;
    }

    const ext =
      this.config.defaultLanguage.toLowerCase() === 'typescript' ? 'ts' : 'js';

    const configuredDefaultFilename = this.config.configuredDefaultFilename;

    const filename = join(
      folderPath.fsPath,
      `${configuredDefaultFilename}.${ext}`,
    );

    if (!existsSync(filename)) {
      const message = l10n.t('The file does not exist!');
      window.showErrorMessage(message);
      return;
    }

    const openPath = Uri.file(filename);

    this.updateBarrel(openPath);
  }

  /**
   * The updateBarrel method.
   *
   * @function updateBarrel
   * @param {Uri} [folderPath] - The path to the folder
   * @public
   * @async
   * @memberof FilesController
   * @example
   * controller.updateBarrel();
   *
   * @returns {Promise<void>} - The promise with no return value
   */
  async updateBarrel(folderPath?: Uri): Promise<void> {
    // If the folder is not valid, return
    if (!folderPath) {
      const message = l10n.t('The folder is not valid!');
      window.showErrorMessage(message);
      return;
    }

    const workspaceFolder = workspace.getWorkspaceFolder(folderPath);

    // If the folder is not in the workspace, return
    if (!workspaceFolder) {
      const message = l10n.t('The folder is not in the workspace!');
      window.showErrorMessage(message);
      return;
    }

    const baseDir = dirname(folderPath.fsPath);

    const content = await this.getContent(baseDir);

    if (content) {
      const document = await workspace.openTextDocument(folderPath);

      const edit = new WorkspaceEdit();
      const start = new Position(0, 0);
      const end = new Position(document.lineCount, 0);
      const range = new Range(start, end);

      edit.replace(document.uri, range, content);

      await workspace.applyEdit(edit);

      await commands.executeCommand('workbench.action.files.saveAll');
      await window.showTextDocument(document);

      const message = l10n.t('File successfully updated!');
      window.showInformationMessage(message);
    }
  }

  // Private methods

  /**
   * The getContent method.
   *
   * @function getContent
   * @param {string} folderPath - The folder path
   * @private
   * @async
   * @memberof FilesController
   * @example
   * controller.getContent();
   *
   * @returns {Promise<string | undefined>} - The promise with the content
   */
  private async getContent(folderPath: string): Promise<string | undefined> {
    // Get the configuration values
    const {
      disableRecursiveBarrelling,
      includeExtensionOnExport,
      ignoreFilePathPatternOnExport,
      supportsHiddenFiles,
      preserveGitignoreSettings,
      useSingleQuotes,
      excludeSemiColonAtEndOfLine,
      keepExtensionOnExport,
      endOfLine,
      detectExportsInFiles,
      useNamedExports,
      exportDefaultFilename,
      headerCommentTemplate,
      insertFinalNewline,
    } = this.config;

    const quote = useSingleQuotes ? "'" : '"';
    const semi = excludeSemiColonAtEndOfLine ? '' : ';';
    const newline = endOfLine === 'crlf' ? '\r\n' : '\n';

    const include =
      includeExtensionOnExport.length === 1
        ? `**/*.${includeExtensionOnExport[0]}`
        : `**/*.{${includeExtensionOnExport.join(',')}}`;

    // Retrieve matching files
    const files = await this.findFiles(
      folderPath,
      [include],
      ignoreFilePathPatternOnExport,
      !disableRecursiveBarrelling,
      supportsHiddenFiles,
      preserveGitignoreSettings,
    );

    // If no files are found, return
    if (files.length === 0) {
      const relativePath = workspace.asRelativePath(folderPath);
      const allFilesInFolder = await workspace.findFiles(
        `${relativePath}/**/*`,
      );

      if (allFilesInFolder.length === 0) {
        const message = l10n.t('The {0} folder is empty!', [relativePath]);
        window.showWarningMessage(message);
      } else {
        const message = l10n.t(
          'No files found matching the specified patterns in the {0} folder! Please check the include and exclude files in the settings',
          [relativePath],
        );
        window.showWarningMessage(message);
      }

      return;
    }

    let content: string = '';

    if (headerCommentTemplate.length > 0) {
      content += headerCommentTemplate.join(newline) + newline + newline;
    }

    const exports: string[] = [];

    for (const file of files) {
      let relativePath = relative(folderPath, file.fsPath).replace(/\\/g, '/');

      if (!keepExtensionOnExport) {
        relativePath = relativePath.replace(/\.[^/.]+$/, '');
      }

      if (detectExportsInFiles) {
        // Get formatted filename
        const baseName = basename(file.path).replace(/\.[^/.]+$/, '');
        const formattedFileName = this.formatFileName(
          baseName,
          exportDefaultFilename,
        );

        const document = await workspace.openTextDocument(file.path);
        const text = document.getText();

        // Check if the file has a default export
        const defaultExportRegex =
          /\bexport\s*(?:async|function|const|let|var)?\s*default\s+/g;
        // Check if the file has exported members
        const exportedMembersRegex = /\bexport\s*\{\s*[^}]*\s*\}/g;
        // Check if the file has a named export
        const namedExportRegex =
          /\bexport\s+(?:(async|abstract|declare|const|let|var)\s*)?(enum|function|class|type|interface|const|let|var)\s+(\w+)\b/g;

        if (text.match(defaultExportRegex)) {
          exports.push(
            `export { default as ${formattedFileName} } from ${quote}./${relativePath}${quote}${semi}`,
          );

          continue;
        }

        if (text.match(exportedMembersRegex)) {
          if (useNamedExports) {
            const fileMembers: string[] = [];

            for (const [, members] of text.matchAll(exportedMembersRegex)) {
              for (const member of members.split(',')) {
                const name = member.trim();
                fileMembers.push(name);
              }
            }

            if (fileMembers.length > 0) {
              const exportName = fileMembers.join(', ');
              exports.push(
                `export { ${exportName} } from ${quote}./${relativePath}${quote}${semi}`,
              );
            }
          } else {
            exports.push(
              `export * as ${formattedFileName} from ${quote}./${relativePath}${quote}${semi}`,
            );
          }

          continue;
        }

        if (text.match(namedExportRegex)) {
          if (useNamedExports) {
            const fileTypeExports: string[] = [];
            const fileExports: string[] = [];

            for (const [, , type, name] of text.matchAll(namedExportRegex)) {
              (type === 'interface' || type === 'type'
                ? fileTypeExports
                : fileExports
              ).push(name);
            }

            if (fileTypeExports.length > 0 || fileExports.length > 0) {
              if (!fileExports.length) {
                // Only type exports exist
                const typeExports = fileTypeExports.join(', ');

                exports.push(
                  `export type { ${typeExports} } from ${quote}./${relativePath}${quote}${semi}`,
                );
              } else if (!fileTypeExports.length) {
                // Only value exports exist
                const valueExports = fileExports.join(', ');

                exports.push(
                  `export { ${valueExports} } from ${quote}./${relativePath}${quote}${semi}`,
                );
              } else {
                // Both type and value exports exist
                const combinedExports = [
                  ...fileTypeExports.map((name) => `type ${name}`),
                  ...fileExports,
                ].join(', ');

                exports.push(
                  `export { ${combinedExports} } from ${quote}./${relativePath}${quote}${semi}`,
                );
              }
            }
          } else {
            exports.push(
              `export * as ${formattedFileName} from ${quote}./${relativePath}${quote}${semi}`,
            );
          }

          continue;
        }
      } else {
        exports.push(`export * from ${quote}./${relativePath}${quote}${semi}`);
      }
    }

    content += exports.join(newline);

    // Add a final newline
    if (insertFinalNewline) {
      content += newline;
    }

    return content;
  }

  /**
   * The formatFileName method.
   *
   * @function formatFileName
   * @param {string} fileName - The file name
   * @param {string} style - The style
   * @private
   * @memberof FilesController
   * @example
   * controller.formatFileName('fileName', 'style');
   *
   * @returns {string} - The formatted file name
   */
  private formatFileName(fileName: string, style: string): string {
    switch (style) {
      case 'camelCase':
        fileName = fileName.replace(/[-.](.)/g, (_, c) => c.toUpperCase());
        break;

      case 'pascalCase':
        fileName = fileName
          .replace(/[-.]\w/g, (match) => match.charAt(1).toUpperCase())
          .replace(/^./, (match) => match.toUpperCase());
        break;

      case 'kebabCase':
        fileName = fileName.replace(/[-.](.)/g, (_, c) => `-${c}`);
        break;

      case 'snakeCase':
        fileName = fileName.replace(/[-.](.)/g, (_, c) => `_${c}`);
        break;
    }

    return fileName;
  }

  /**
   * The saveFile method.
   *
   * @function saveFile
   * @param {string} path - The path
   * @param {string} filename - The filename
   * @param {string} data - The data
   * @private
   * @async
   * @memberof FilesController
   * @example
   * controller.saveFile('path', 'filename', 'data');
   *
   * @returns {Promise<void>} - The promise with no return value
   */
  private async saveFile(
    path: string,
    filename: string,
    data: string,
  ): Promise<void> {
    const file = join(path, filename);

    if (!existsSync(dirname(file))) {
      mkdirSync(dirname(file), { recursive: true });
    }

    access(file, (err: any) => {
      if (err) {
        open(file, 'w+', (err: any, fd: any) => {
          if (err) {
            const message = l10n.t('The file has not been created!');
            window.showErrorMessage(message);
            return;
          }

          writeFile(fd, data, 'utf8', (err: any) => {
            if (err) {
              const message = l10n.t('The file has not been created!');
              window.showErrorMessage(message);
              return;
            }

            const openPath = Uri.file(file);

            workspace.openTextDocument(openPath).then(async (filename) => {
              await commands.executeCommand('workbench.action.files.saveAll');
              await window.showTextDocument(filename);
            });
          });
        });

        const message = l10n.t('File created successfully!');
        window.showInformationMessage(message);
      } else {
        const message = l10n.t('The file name already exists!');
        window.showWarningMessage(message);
      }
    });
  }

  /**
   * The findFiles method.
   *
   * @function findFiles
   * @param {string} baseDir - The base directory
   * @param {string[]} include - The include pattern
   * @param {string[]} exclude - The exclude pattern
   * @private
   * @async
   * @memberof FilesController
   * @example
   * controller.findFiles('baseDir', ['include'], ['exclude']);
   *
   * @returns {Promise<Uri[]>} - The promise with the files
   */
  private async findFiles(
    baseDir: string,
    include: string[], // Include patterns
    exclude: string[], // Exclude patterns
    allowRecursion: boolean = true, // Toggle recursive search
    allowHidden: boolean = true, // Toggle hidden files
    respectGitignore: boolean = false, // Toggle .gitignore respect
  ): Promise<Uri[]> {
    // If we need to respect .gitignore, we need to load it
    let gitignore;
    if (respectGitignore) {
      const gitignorePath = join(baseDir, '.gitignore');
      // Load .gitignore if it exists
      if (existsSync(gitignorePath)) {
        gitignore = ignore().add(readFileSync(gitignorePath, 'utf8'));
      }
    }

    // Configure fast-glob options
    const options = {
      cwd: baseDir, // Set base directory for searching
      absolute: true, // Ensure paths are absolute
      onlyFiles: true, // Match only files, not directories
      dot: allowHidden, // Include files and directories starting with a dot
      deep: allowRecursion ? undefined : 1, // Toggle recursion
      ignore: exclude, // Exclude patterns
    };

    try {
      // Use fast-glob to find matching files
      let foundFilePaths = await fastGlob(include, options);

      if (gitignore) {
        // Filter out files that are ignored by .gitignore
        foundFilePaths = foundFilePaths.filter((filePath) => {
          const relativePath = relative(baseDir, filePath); // Convert to relative paths
          return !gitignore.ignores(relativePath);
        });
      }

      // Convert file paths to VS Code Uri objects
      return foundFilePaths.sort().map((filePath) => Uri.file(filePath));
    } catch (error) {
      const message = l10n.t('Error while finding files: {0}', [error]);
      window.showErrorMessage(message);
      return [];
    }
  }
}
