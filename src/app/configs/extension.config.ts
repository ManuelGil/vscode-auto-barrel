import { WorkspaceConfiguration } from 'vscode';

import {
  DEFAULT_FILENAME,
  DEFAULT_LANGUAGE,
  DETECT_EXPORTS,
  DISABLE_RECURSIVE,
  END_OF_LINE,
  EXCLUDE_PATTERNS,
  EXCLUDE_SEMICOLON,
  EXPORT_FILENAME,
  HEADER_COMMENT_TEMPLATE,
  INCLUDE_EXTENSIONS,
  INSERT_FINAL_NEWLINE,
  KEEP_EXTENSION,
  PRESERVE_GITIGNORE,
  RECURSION_DEPTH,
  SUPPORTS_HIDDEN,
  USE_NAMED_EXPORTS,
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
 * @property {boolean} enable - The flag to enable the extension
 * @property {string} defaultLanguage - The default language
 * @property {boolean} disableRecursiveBarrelling - The flag to disable recursive barrelling
 * @property {string[]} includeExtensionOnExport - The extensions to include in the export
 * @property {string[]} ignoreFilePathPatternOnExport - The file path patterns to ignore on export
 * @property {number} maxSearchRecursionDepth - The maximum search recursion depth
 * @property {boolean} supportsHiddenFiles - The flag to allow hidden files
 * @property {boolean} preserveGitignoreSettings - The flag to respect the .gitignore file
 * @property {boolean} keepExtensionOnExport - The flag to keep the extension on export
 * @property {boolean} detectExportsInFiles - The flag to detect exports in files
 * @property {string} useNamedExports - The filename to export the default export
 * @property {boolean} exportDefaultFilename - The filename to export the default export
 * @property {string} configuredDefaultFilename - The configured default filename
 * @property {string[]} headerCommentTemplate - The header comment template
 * @property {boolean} excludeSemiColonAtEndOfLine - The flag to exclude a semicolon at the end of a line
 * @property {boolean} useSingleQuotes - The flag to use single quotes
 * @property {string} endOfLine - The end of line character
 * @property {boolean} insertFinalNewline - The flag to insert a final newline
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
   * The flag to enable the extension.
   * @type {boolean}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.enable);
   */
  enable: boolean;

  /**
   * The default language.
   * @type {'TypeScript' | 'JavaScript'}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.defaultLanguage);
   */
  defaultLanguage: 'TypeScript' | 'JavaScript';

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
   * The maximum search recursion depth.
   * @type {number}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.maxSearchRecursionDepth);
   */
  maxSearchRecursionDepth: number;

  /**
   * The flag to allow hidden files.
   * @type {boolean}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.supportsHiddenFiles);
   */
  supportsHiddenFiles: boolean;

  /**
   * The flag to respect the .gitignore file.
   * @type {boolean}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.preserveGitignoreSettings);
   */
  preserveGitignoreSettings: boolean;

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
   * The flag to detect exports in files.
   * @type {boolean}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.detectExportsInFiles);
   */
  detectExportsInFiles: boolean;

  /**
   * The flag to use named exports.
   * @type {string}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.useNamedExports);
   */
  useNamedExports: boolean;

  /**
   * The filename to export the default export.
   * @type {string}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.exportDefaultFilename);
   */
  exportDefaultFilename: string;

  /**
   * The configured default filename.
   * @type {string}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.configuredDefaultFilename);
   */
  configuredDefaultFilename: string;

  /**
   * The header comment template.
   * @type {string}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.headerCommentTemplate);
   */
  headerCommentTemplate: string[];

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

  /**
   * The flag to insert a final newline.
   * @type {boolean}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.insertFinalNewline);
   */
  insertFinalNewline: boolean;

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
    this.enable = config.get<boolean>('enable', true);
    this.defaultLanguage = config.get<'TypeScript' | 'JavaScript'>(
      'language.defaultLanguage',
      DEFAULT_LANGUAGE,
    );
    this.disableRecursiveBarrelling = config.get<boolean>(
      'files.disableRecursiveBarrelling',
      DISABLE_RECURSIVE,
    );
    this.includeExtensionOnExport = config.get<string[]>(
      'files.includeExtensionOnExport',
      INCLUDE_EXTENSIONS,
    );
    this.ignoreFilePathPatternOnExport = config.get<string[]>(
      'files.ignoreFilePathPatternOnExport',
      EXCLUDE_PATTERNS,
    );
    this.maxSearchRecursionDepth = config.get<number>(
      'files.maxSearchRecursionDepth',
      RECURSION_DEPTH,
    );
    this.supportsHiddenFiles = config.get<boolean>(
      'files.supportsHiddenFiles',
      SUPPORTS_HIDDEN,
    );
    this.preserveGitignoreSettings = config.get<boolean>(
      'files.preserveGitignoreSettings',
      PRESERVE_GITIGNORE,
    );
    this.keepExtensionOnExport = config.get<boolean>(
      'files.keepExtensionOnExport',
      KEEP_EXTENSION,
    );
    this.detectExportsInFiles = config.get<boolean>(
      'files.detectExportsInFiles',
      DETECT_EXPORTS,
    );
    this.useNamedExports = config.get<boolean>(
      'files.useNamedExports',
      USE_NAMED_EXPORTS,
    );
    this.exportDefaultFilename = config.get<string>(
      'files.exportDefaultFilename',
      EXPORT_FILENAME,
    );
    this.configuredDefaultFilename = config.get<string>(
      'files.configuredDefaultFilename',
      DEFAULT_FILENAME,
    );
    this.headerCommentTemplate = config.get<string[]>(
      'formatting.headerCommentTemplate',
      HEADER_COMMENT_TEMPLATE,
    );
    this.excludeSemiColonAtEndOfLine = config.get<boolean>(
      'formatting.excludeSemiColonAtEndOfLine',
      EXCLUDE_SEMICOLON,
    );
    this.useSingleQuotes = config.get<boolean>(
      'formatting.useSingleQuotes',
      USE_SINGLE_QUOTES,
    );
    this.endOfLine = config.get<string>('formatting.endOfLine', END_OF_LINE);
    this.insertFinalNewline = config.get<boolean>(
      'formatting.insertFinalNewline',
      INSERT_FINAL_NEWLINE,
    );
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
    this.enable = config.get<boolean>('enable', this.enable);
    this.defaultLanguage = config.get<'TypeScript' | 'JavaScript'>(
      'language.defaultLanguage',
      this.defaultLanguage,
    );
    this.disableRecursiveBarrelling = config.get<boolean>(
      'files.disableRecursiveBarrelling',
      this.disableRecursiveBarrelling,
    );
    this.includeExtensionOnExport = config.get<string[]>(
      'files.includeExtensionOnExport',
      this.includeExtensionOnExport,
    );
    this.ignoreFilePathPatternOnExport = config.get<string[]>(
      'files.ignoreFilePathPatternOnExport',
      this.ignoreFilePathPatternOnExport,
    );
    this.maxSearchRecursionDepth = config.get<number>(
      'files.maxSearchRecursionDepth',
      this.maxSearchRecursionDepth,
    );
    this.supportsHiddenFiles = config.get<boolean>(
      'files.supportsHiddenFiles',
      this.supportsHiddenFiles,
    );
    this.preserveGitignoreSettings = config.get<boolean>(
      'files.preserveGitignoreSettings',
      this.preserveGitignoreSettings,
    );
    this.keepExtensionOnExport = config.get<boolean>(
      'files.keepExtensionOnExport',
      this.keepExtensionOnExport,
    );
    this.detectExportsInFiles = config.get<boolean>(
      'files.detectExportsInFiles',
      this.detectExportsInFiles,
    );
    this.useNamedExports = config.get<boolean>(
      'files.useNamedExports',
      this.useNamedExports,
    );
    this.exportDefaultFilename = config.get<string>(
      'files.exportDefaultFilename',
      this.exportDefaultFilename,
    );
    this.configuredDefaultFilename = config.get<string>(
      'files.configuredDefaultFilename',
      this.configuredDefaultFilename,
    );
    this.headerCommentTemplate = config.get<string[]>(
      'formatting.headerCommentTemplate',
      this.headerCommentTemplate,
    );
    this.excludeSemiColonAtEndOfLine = config.get<boolean>(
      'formatting.excludeSemiColonAtEndOfLine',
      this.excludeSemiColonAtEndOfLine,
    );
    this.useSingleQuotes = config.get<boolean>(
      'formatting.useSingleQuotes',
      this.useSingleQuotes,
    );
    this.endOfLine = config.get<string>('formatting.endOfLine', this.endOfLine);
    this.insertFinalNewline = config.get<boolean>(
      'formatting.insertFinalNewline',
      this.insertFinalNewline,
    );
  }
}
