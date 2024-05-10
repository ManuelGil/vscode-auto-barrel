import { WorkspaceConfiguration } from 'vscode';

import {
  DEFAULT_LANGUAGE,
  END_OF_LINE,
  EXCLUDE_PATTERNS,
  EXCLUDE_SEMICOLON,
  INCLUDE_EXTENSIONS,
  KEEP_EXTENSION,
  DISABLE_RECURSIVE,
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
 * @property {string} defaultLanguage - The default language
 * @property {boolean} disableRecursiveBarrelling - The flag to disable recursive barrelling
 * @property {string[]} includeExtensionOnExport - The extensions to include in the export
 * @property {string[]} ignoreFilePathPatternOnExport - The file path patterns to ignore on export
 * @property {boolean} keepExtensionOnExport - The flag to keep the extension on export
 * @property {boolean} excludeSemiColonAtEndOfLine - The flag to exclude a semicolon at the end of a line
 * @property {boolean} useSingleQuotes - The flag to use single quotes
 * @property {string} endOfLine - The end of line character
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
   * The flag to disable recursive barrelling.
   * @type {boolean}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.disableRecursiveBarrelling);
   */
  disableRecursiveBarrelling: boolean;

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
    this.disableRecursiveBarrelling =
      config.get<boolean>('files.disableRecursiveBarrelling') ??
      DISABLE_RECURSIVE;
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
