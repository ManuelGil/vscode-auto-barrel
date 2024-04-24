import { WorkspaceConfiguration } from 'vscode';

import {
  DEFAULT_LANGUAGE,
  END_OF_LINE,
  EXCLUDE_PATTERNS,
  EXCLUDE_SEMICOLON,
  INCLUDE_EXTENSIONS,
  KEEP_EXTENSION,
  USE_SINGLE_QUOTES,
} from './constants.config';

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
 * console.log(config.includeExtensionOnExport);
 * console.log(config.exclude);
 */
export class ExtensionConfig {
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  // Public properties
  /**
   * The default language.
   * @type {string}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.defaultLanguage);
   */
  defaultLanguage: string;

  /**
   * The extensions to include in the export.
   * @type {string[]}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.includeExtensionOnExport);
   */
  includeExtensionOnExport: string[];

  /**
   * The file path patterns to ignore on export.
   * @type {string[]}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.ignoreFilePathPatternOnExport);
   */
  ignoreFilePathPatternOnExport: string[];

  /**
   * The flag to keep the extension on export.
   * @type {boolean}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.keepExtensionOnExport);
   */
  keepExtensionOnExport: boolean;

  /**
   * The flag to exclude a semicolon at the end of a line.
   * @type {boolean}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.excludeSemiColonAtEndOfLine);
   */
  excludeSemiColonAtEndOfLine: boolean;

  /**
   * The flag to use single quotes.
   * @type {boolean}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.useSingleQuotes);
   */
  useSingleQuotes: boolean;

  /**
   * The end of line character.
   * @type {string}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.endOfLine);
   */
  endOfLine: string;

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
    this.defaultLanguage =
      config.get<string>('language.defaultLanguage') ?? DEFAULT_LANGUAGE;
    this.includeExtensionOnExport =
      config.get<string[]>('files.includeExtensionOnExport') ??
      INCLUDE_EXTENSIONS;
    this.ignoreFilePathPatternOnExport =
      config.get<string[]>('files.ignoreFilePathPatternOnExport') ??
      EXCLUDE_PATTERNS;
    this.keepExtensionOnExport =
      config.get<boolean>('files.keepExtensionOnExport') ?? KEEP_EXTENSION;
    this.excludeSemiColonAtEndOfLine =
      config.get<boolean>('formatting.excludeSemiColonAtEndOfLine') ??
      EXCLUDE_SEMICOLON;
    this.useSingleQuotes =
      config.get<boolean>('formatting.useSingleQuotes') ?? USE_SINGLE_QUOTES;
    this.endOfLine = config.get<string>('formatting.endOfLine') ?? END_OF_LINE;
  }
}
