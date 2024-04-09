import {
  Position,
  Range,
  Selection,
  TextEditorRevealType,
  ThemeIcon,
  window,
  workspace,
} from 'vscode';

import { ExtensionConfig } from '../configs';
import { directoryMap, getRelativePath } from '../helpers';
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
    // Get the files in the folder
    const files = await directoryMap('/', {
      extensions: this.config.include,
      ignore: this.config.exclude,
      maxResults,
    });

    if (files.length !== 0) {
      let nodes: NodeModel[] = [];

      files.sort((a, b) => a.path.localeCompare(b.path));

      for (const file of files) {
        const document = await workspace.openTextDocument(file);

        const path = await getRelativePath(document.fileName);
        let filename = path.split('/').pop();

        if (filename && this.config.showPath) {
          const folder = path.split('/').slice(0, -1).join('/');

          filename += folder ? ` (${folder})` : ' (root)';
        }

        nodes.push(
          new NodeModel(
            filename ?? 'Untitled',
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
}
