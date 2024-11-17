import * as fg from 'fast-glob';
import { access, existsSync, mkdirSync, open, writeFile } from 'fs';
import { dirname, join } from 'path';
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

    const filename = `index.${ext}`;

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

    const filename = join(folderPath.fsPath, `index.${ext}`);

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
    const disableRecursiveBarrelling = this.config.disableRecursiveBarrelling;
    const includeExtensionOnExport = this.config.includeExtensionOnExport;
    const ignoreFilePathPatternOnExport =
      this.config.ignoreFilePathPatternOnExport;

    const include = `**/*.{${includeExtensionOnExport.join(',')}}`;

    // Get the files
    const files = await this.findFiles(
      folderPath,
      [include],
      ignoreFilePathPatternOnExport,
      !disableRecursiveBarrelling,
    );

    // If no files are found, return
    if (files.length === 0) {
      const message = l10n.t('No files found in the folder!');
      window.showErrorMessage(message);
      return;
    }

    // Get the configuration values
    const quote = this.config.useSingleQuotes ? "'" : '"';
    const semi = this.config.excludeSemiColonAtEndOfLine;
    const keepExtension = this.config.keepExtensionOnExport;
    const endOfLine = this.config.endOfLine;
    const detectExportsInFiles = this.config.detectExportsInFiles;
    const exportDefaultFilename = this.config.exportDefaultFilename;

    const exports = [];

    for (const file of files) {
      let path = file.fsPath.replace(folderPath, '').replace(/\\/g, '/');

      if (!keepExtension) {
        path = path.replace(/\.[^/.]+$/, '');
      }

      if (detectExportsInFiles) {
        let fileName = file.path.split('/').pop();

        if (!fileName) {
          continue;
        }

        fileName = fileName.replace(/\.[^/.]+$/, '');

        switch (exportDefaultFilename) {
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

          default:
            break;
        }

        const document = await workspace.openTextDocument(file.path);
        const text = document.getText();

        // Check if the file has a default export
        const defaultExportRegex = /export\s*default\s*/;
        // Check if the file has a named export
        const namedExportRegex = /export\s*(\w+)\s*|\s*export\s*\{\s*/;

        if (text.match(defaultExportRegex)) {
          exports.push(
            `export { default as ${fileName} } from ${quote}.${path}${quote}${semi ? '' : ';'}`,
          );
        } else if (text.match(namedExportRegex)) {
          exports.push(
            `export * from ${quote}.${path}${quote}${semi ? '' : ';'}`,
          );
        }
      } else {
        exports.push(
          `export * from ${quote}.${path}${quote}${semi ? '' : ';'}`,
        );
      }
    }

    // Get the configuration values
    const insertFinalNewline = this.config.insertFinalNewline;

    let content = exports.join(endOfLine === 'crlf' ? '\r\n' : '\n');

    // Add a final newline
    if (insertFinalNewline) {
      content += endOfLine === 'crlf' ? '\r\n' : '\n';
    }

    return content;
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
  ): Promise<Uri[]> {
    // Configure fast-glob options
    const options = {
      cwd: baseDir, // Set base directory for searching
      absolute: true, // Ensure paths are absolute
      onlyFiles: true, // Match only files, not directories
      deep: allowRecursion ? undefined : 1, // Toggle recursion
      ignore: exclude, // Exclude patterns
    };

    try {
      // Use fast-glob to find matching files
      const filePaths = await fg(include, options);

      // Convert file paths to VS Code Uri objects
      return filePaths.sort().map((filePath) => Uri.file(filePath));
    } catch (error) {
      const message = l10n.t('Error while finding files: {0}', [error]);
      window.showErrorMessage(message);
      return [];
    }
  }
}
