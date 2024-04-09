import { WorkspaceConfiguration } from 'vscode';

import { EXCLUDE, INCLUDE, SHOW_PATH } from './constants.config';

/**
 * The Config class.
 *
 * @class
 * @classdesc The class that represents the configuration of the extension.
 * @export
 * @public
 * @property {WorkspaceConfiguration} config - The workspace configuration
 * @property {string[]} include - The files to include
 * @property {string[]} exclude - The files to exclude
 * @property {{ apiKey: string; model: string; }} openai - The OpenAI API key
 * @example
 * const config = new Config(workspace.getConfiguration());
 * console.log(config.include);
 * console.log(config.exclude);
 */
export class ExtensionConfig {
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  // Public properties
  /**
   * The files to include.
   * @type {string[]}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.include);
   */
  include: string[];
  /**
   * The files to exclude.
   * @type {string[]}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.exclude);
   */
  exclude: string[];
  /**
   * Whether to show the path or not.
   * @type {boolean}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.showPath);
   */
  showPath: boolean;
  /**
   * The OpenAI API key.
   * @type {string}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.openai.apiKey);
   */
  openai: {
    apiKey: string;
    model: string;
  };

  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the Config class.
   *
   * @constructor
   * @param {WorkspaceConfiguration} config - The workspace configuration
   * @public
   * @memberof Config
   */
  constructor(readonly config: WorkspaceConfiguration) {
    this.include = config.get<string[]>('files.include') ?? INCLUDE;
    this.exclude = config.get<string[]>('files.exclude') ?? EXCLUDE;
    this.showPath = config.get<boolean>('files.showPath') ?? SHOW_PATH;
    this.openai = {
      apiKey: config.get<string>('openai.apiKey') ?? '',
      model: config.get<string>('openai.model') ?? '',
    };
  }

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods
  /**
   * The update method.
   *
   * @function update
   * @param {WorkspaceConfiguration} config - The workspace configuration
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * config.update(workspace.getConfiguration());
   */
  update(config: WorkspaceConfiguration): void {
    this.include = config.get<string[]>('files.include') ?? INCLUDE;
    this.exclude = config.get<string[]>('files.exclude') ?? EXCLUDE;
    this.showPath = config.get<boolean>('files.showPath') ?? SHOW_PATH;
    this.openai = {
      apiKey: config.get<string>('openai.apiKey') ?? '',
      model: config.get<string>('openai.model') ?? '',
    };
  }
}
