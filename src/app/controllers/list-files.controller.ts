import {
  Position,
  Range,
  Selection,
  TextEditorRevealType,
  ThemeIcon,
  Uri,
  window,
  workspace,
} from 'vscode';

import { access, existsSync, mkdirSync, open, writeFile } from 'fs';
import { dirname, join } from 'path';
import { ExtensionConfig } from '../configs';
import { NodeModel } from '../models';

/**
 * The ListFilesController class.
 *
 * @class
 * @classdesc The class that represents the list files controller.
 * @export
 * @public
 * @property {ExtensionConfig} config - The configuration object
 * @example
 * const controller = new ListFilesController(config);
 */
export class ListFilesController {
  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the ListFilesController class
   *
   * @constructor
   * @param {ExtensionConfig} config - The configuration object
   * @public
   * @memberof ListFilesController
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
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof ListFilesController
   * @example
   * controller.createBarrel();
   *
   * @returns {Promise<void>} - The promise with no return value
   */
  async createBarrel(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path
      ? await workspace.asRelativePath(path.path)
      : '';

    // If the folder is not valid, return
    if (!folderPath) {
      return;
    }

    const include = `${folderPath}/**/*.{${this.config.includeExtensionOnExport.join(',')}}`;

    // Get the files in the folder
    const files = await this.directoryMap({
      extensions: [include],
      ignore: this.config.ignoreFilePathPatternOnExport,
      maxResults: 512,
    });

    // If files are found, save them to a file
    if (files.length !== 0) {
      let paths = [];

      for (const file of files) {
        const relativePath = await workspace.asRelativePath(file.path);
        paths.push(relativePath.replace(folderPath, '').replace('.ts', ''));
      }

      // Write the content to a file
      await this.saveFile(
        folderPath,
        'index.ts',
        paths.map((path) => `export * from '.${path}';`).join('\n'),
      );
    }
  }

  /**
   * The getFiles method.
   *
   * @function getFiles
   * @param {number} maxResults - The maximum number of results
   * @public
   * @async
   * @memberof ListFilesController
   * @example
   * controller.getFiles();
   *
   * @returns {Promise<NodeModel[] | void>} - The list of files
   */
  async getFiles(
    maxResults: number = Number.MAX_SAFE_INTEGER,
  ): Promise<NodeModel[] | void> {
    const include = `*/**/*.{${this.config.includeExtensionOnExport.join(',')}}`;

    // Get the files in the folder
    const files = await this.directoryMap({
      extensions: [include],
      ignore: this.config.ignoreFilePathPatternOnExport,
      maxResults,
    });

    if (files.length !== 0) {
      let nodes: NodeModel[] = [];

      for (const file of files) {
        const document = await workspace.openTextDocument(file);

        nodes.push(
          new NodeModel(
            document.fileName.replace(/\\/g, '/').split('/').pop() || '',
            new ThemeIcon('file'),
            undefined,
            document.uri,
            'file',
          ),
        );
      }

      return nodes;
    }

    return;
  }

  /**
   * The openFile method.
   *
   * @function openFile
   * @param {NodeModel} uri - The file URI
   * @public
   * @memberof ListFilesController
   * @example
   * controller.openFile('file:///path/to/file');
   *
   * @returns {Promise<void>} - The promise
   */
  openFile(uri: NodeModel) {
    if (uri.resourceUri) {
      workspace.openTextDocument(uri.resourceUri).then((filename) => {
        window.showTextDocument(filename);
      });
    }
  }

  /**
   * The gotoLine method.
   *
   * @function gotoLine
   * @param {string} uri - The file URI
   * @param {number} line - The line number
   * @public
   * @memberof ListFilesController
   * @example
   * controller.gotoLine('file:///path/to/file', 1);
   *
   * @returns {void} - The promise
   */
  gotoLine(uri: string, line: number) {
    workspace.openTextDocument(uri).then((document) => {
      window.showTextDocument(document).then((editor) => {
        const pos = new Position(line, 0);
        editor.revealRange(
          new Range(pos, pos),
          TextEditorRevealType.InCenterIfOutsideViewport,
        );
        editor.selection = new Selection(pos, pos);
      });
    });
  }

  // Private methods
  /**
   * The directoryMap method.
   *
   * @function directoryMap
   * @param {Object} [options] - The options object
   * @param {string[]} [options.extensions] - The extensions
   * @param {string[]} [options.ignore] - The ignore
   * @param {number} [options.maxResults] - The maximum number of results
   * @private
   * @async
   * @memberof ListFilesController
   * @example
   * controller.directoryMap();
   *
   * @returns {Promise<Uri[]>} - The promise with the list of URIs
   */
  private async directoryMap(options?: {
    extensions?: string[];
    ignore?: string[];
    maxResults?: number;
  }): Promise<Uri[]> {
    let include = '';
    let exclude = '';

    if (options && options.extensions && options.extensions.length) {
      include = `{${options.extensions.join(',')}}`;
    }

    if (options && options.ignore && options.ignore.length) {
      exclude = `{${options.ignore.join(',')}}`;
    }

    return workspace.findFiles(include, exclude, options?.maxResults);
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
   * @memberof ListFilesController
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
    let folder: string = '';

    if (workspace.workspaceFolders) {
      folder = workspace.workspaceFolders[0].uri.fsPath;
    } else {
      window.showErrorMessage('The file has not been created!');
      return;
    }

    const file = join(folder, path, filename);

    if (!existsSync(dirname(file))) {
      mkdirSync(dirname(file), { recursive: true });
    }

    access(file, (err: any) => {
      if (err) {
        open(file, 'w+', (err: any, fd: any) => {
          if (err) {
            throw err;
          }

          writeFile(fd, data, 'utf8', (err: any) => {
            if (err) {
              throw err;
            }

            const openPath = Uri.file(file);

            workspace.openTextDocument(openPath).then((filename) => {
              window.showTextDocument(filename);
            });
          });
        });

        window.showInformationMessage('Successfully created the file!');
      } else {
        window.showWarningMessage('Name already exist!');
      }
    });
  }
}
