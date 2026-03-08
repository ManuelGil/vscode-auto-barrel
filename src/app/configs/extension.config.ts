import { WorkspaceConfiguration } from 'vscode';

import {
  CURRENT_WORKSPACE,
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
  SILENT_MODE,
  SORT_EXPORTS,
  SUPPORTS_HIDDEN,
  USE_NAMED_EXPORTS,
  USE_SINGLE_QUOTES,
} from './constants.config';

/**
 * Represents the configuration of the Auto Barrel extension.
 * This class maps workspace configuration values to strongly typed properties
 * and handles fallback to default values.
 */
export class ExtensionConfig {
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  // Public properties

  /**
   * Flag to enable the extension.
   * @type {boolean}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.enable);
   */
  enable: boolean;

  /**
   * Flag to enable silent mode. When enabled, the extension will suppress notifications and logs.
   * @type {boolean}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.silentMode);
   */
  silentMode: boolean;

  /**
   * The default language for generated files.
   * @type {'TypeScript' | 'JavaScript'}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.defaultLanguage);
   */
  defaultLanguage: 'TypeScript' | 'JavaScript';

  /**
   * Flag to disable recursive barreling.
   * @type {boolean}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.disableRecursiveBarrelling);
   */
  disableRecursiveBarrelling: boolean;

  /**
   * File extensions to include when barreling.
   * @type {string[]}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.includeExtensionOnExport);
   */
  includeExtensionOnExport: string[];

  /**
   * File path patterns to ignore on export.
   * @type {string[]}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.ignoreFilePathPatternOnExport);
   */
  ignoreFilePathPatternOnExport: string[];

  /**
   * The maximum depth for recursive search.
   * @type {number}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.maxSearchRecursionDepth);
   */
  maxSearchRecursionDepth: number;

  /**
   * Flag to allow hidden files.
   * @type {boolean}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.supportsHiddenFiles);
   */
  supportsHiddenFiles: boolean;

  /**
   * Flag to respect the .gitignore file settings.
   * @type {boolean}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.preserveGitignoreSettings);
   */
  preserveGitignoreSettings: boolean;

  /**
   * Flag to keep the extension in export statements.
   * @type {boolean}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.keepExtensionOnExport);
   */
  keepExtensionOnExport: boolean;

  /**
   * Flag to detect existing exports in files.
   * @type {boolean}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.detectExportsInFiles);
   */
  detectExportsInFiles: boolean;

  /**
   * Flag to prefer named exports over default exports.
   * @type {boolean}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.useNamedExports);
   */
  useNamedExports: boolean;

  /**
   * The default filename used for default exports.
   * @type {string}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.exportDefaultFilename);
   */
  exportDefaultFilename: string;

  /**
   * The configured default filename for the generated barrel file.
   * @type {string}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.configuredDefaultFilename);
   */
  configuredDefaultFilename: string;

  /**
   * The template lines for the header comment.
   * @type {string[]}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.headerCommentTemplate);
   */
  headerCommentTemplate: string[];

  /**
   * Flag to exclude a semicolon at the end of export lines.
   * @type {boolean}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.excludeSemiColonAtEndOfLine);
   */
  excludeSemiColonAtEndOfLine: boolean;

  /**
   * Flag to use single quotes for string literals.
   * @type {boolean}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.useSingleQuotes);
   */
  useSingleQuotes: boolean;

  /**
   * The end of line character sequence ('lf' or 'crlf').
   * @type {string}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.endOfLine);
   */
  endOfLine: string;

  /**
   * Flag to insert a final newline at the end of the file.
   * @type {boolean}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.insertFinalNewline);
   */
  insertFinalNewline: boolean;

  /**
   * Strategy for sorting exports in barrel files.
   * @type {string}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.sortExports);
   */
  sortExports: string;

  /**
   * The current active workspace folder path.
   * @type {string}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.workspaceSelection);
   */
  workspaceSelection: string;

  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Initializes a new instance of the ExtensionConfig class.
   *
   * @param config - The initial workspace configuration provided by VS Code.
   *
   * @memberof ExtensionConfig
   *
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.enable);
   */
  constructor(readonly config: WorkspaceConfiguration) {
    this.enable = config.get<boolean>('enable', true);
    this.silentMode = config.get<boolean>('silentMode', SILENT_MODE);
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
    this.sortExports = config.get<string>(
      'formatting.sortExports',
      SORT_EXPORTS,
    );
    this.workspaceSelection = config.get<string>(
      'workspaceSelection',
      CURRENT_WORKSPACE,
    );
  }

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods

  /**
   * Updates the configuration properties based on a new workspace configuration.
   * Existing values are used as fallbacks if the new configuration does not provide them.
   *
   * @param config - The updated workspace configuration.
   *
   * @memberof ExtensionConfig
   *
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * // ... later when configuration changes
   * config.update(workspace.getConfiguration());
   */
  update(config: WorkspaceConfiguration): void {
    this.enable = config.get<boolean>('enable', this.enable);
    this.silentMode = config.get<boolean>('silentMode', this.silentMode);
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
    this.sortExports = config.get<string>(
      'formatting.sortExports',
      this.sortExports,
    );
    this.workspaceSelection = config.get<string>(
      'workspaceSelection',
      this.workspaceSelection,
    );
  }
}
