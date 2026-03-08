/**
 * The unique identifier of the extension.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(EXTENSION_ID);
 *
 * @returns {string} - The unique identifier of the extension
 */
export const EXTENSION_ID: string = 'autoBarrel';

/**
 * The repository ID of the extension.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(EXTENSION_NAME);
 *
 * @returns {string} - The repository ID of the extension
 */
export const EXTENSION_NAME: string = 'vscode-auto-barrel';

/**
 * The display name of the extension.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(EXTENSION_DISPLAY_NAME);
 *
 * @returns {string} - The name of the extension
 */
export const EXTENSION_DISPLAY_NAME: string = 'Auto Barrel';

/**
 * The author's name.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(USER_NAME);
 *
 * @returns {string} - The name of the author
 */
export const USER_NAME: string = 'ManuelGil';

/**
 * The publisher ID of the extension.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(USER_PUBLISHER);
 *
 * @returns {string} - The publisher of the extension
 */
export const USER_PUBLISHER: string = 'imgildev';

/**
 * The repository URL of the extension.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(REPOSITORY_URL);
 *
 * @returns {string} - The documentation URL of the extension
 */
export const REPOSITORY_URL: string = `https://github.com/${USER_NAME}/${EXTENSION_NAME}`;

/**
 * Flag to enable silent mode.
 * @type {boolean}
 * @public
 * @memberof Constants
 * @example
 * console.log(SILENT_MODE);
 *
 * @returns {boolean} - The flag to enable silent mode
 */
export const SILENT_MODE: boolean = false;

/**
 * The default language for generated barrel files.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(DEFAULT_LANGUAGE);
 *
 * @returns {string} - The default language
 */
export const DEFAULT_LANGUAGE: 'TypeScript' | 'JavaScript' = 'TypeScript';

/**
 * Flag to disable recursive barreling.
 * @type {boolean}
 * @public
 * @memberof Constants
 * @example
 * console.log(RECURSIVE_BARRELLING);
 *
 * @returns {boolean} - The flag to recursively barrel
 */
export const DISABLE_RECURSIVE: boolean = false;

/**
 * File extensions to include when barreling.
 * @type {string[]}
 * @public
 * @memberof Constants
 * @example
 * console.log(INCLUDE);
 *
 * @returns {string[]} - The files to include
 */
export const INCLUDE_EXTENSIONS: string[] = ['ts', 'tsx', 'vue'];

/**
 * Glob patterns to exclude when barreling.
 * @type {string[]}
 * @public
 * @memberof Constants
 * @example
 * console.log(EXCLUDE);
 *
 * @returns {string[]} - The files to exclude
 */
export const EXCLUDE_PATTERNS: string[] = [
  '**/*.spec.*',
  '**/*.test.*',
  '**/*.e2e.*',
  '**/index.ts',
  '**/index.js',
];

/**
 * The maximum depth for recursive barreling. 0 means infinite.
 * @type {number}
 * @public
 * @memberof Constants
 * @example
 * console.log(RECURSION_DEPTH);
 *
 * @returns {number} - The recursion depth
 */
export const RECURSION_DEPTH: number = 0;

/**
 * Flag to support hidden files and directories (starting with a dot).
 * @type {boolean}
 * @public
 * @memberof Constants
 * @example
 * console.log(SUPPORTS_HIDDEN);
 *
 * @returns {boolean} - The flag to support hidden files and directories
 */
export const SUPPORTS_HIDDEN: boolean = true;

/**
 * Flag to respect the .gitignore file.
 * @type {boolean}
 * @public
 * @memberof Constants
 * @example
 * console.log(PRESERVE_GITIGNORE);
 *
 * @returns {boolean} - The flag to preserve the .gitignore file
 */
export const PRESERVE_GITIGNORE: boolean = false;

/**
 * Flag to keep the file extension in export statements.
 * @type {boolean}
 * @public
 * @memberof Constants
 * @example
 * console.log(KEEP_EXTENSION);
 *
 * @returns {boolean} - The flag to keep the extension on export
 */
export const KEEP_EXTENSION: boolean = false;

/**
 * Flag to detect existing exports in files.
 * @type {boolean}
 * @public
 * @memberof Constants
 * @example
 * console.log(DETECT_EXPORTS);
 *
 * @returns {boolean} - The flag to detect exports
 */
export const DETECT_EXPORTS: boolean = false;

/**
 * Flag to prefer named exports over default exports.
 * @type {boolean}
 * @public
 * @memberof Constants
 * @example
 * console.log(USE_NAMED_EXPORTS);
 *
 * @returns {boolean} - The flag to use named exports
 */
export const USE_NAMED_EXPORTS: boolean = false;

/**
 * Strategy for naming the export when re-exporting a default export.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(EXPORT_FILENAME);
 *
 * @returns {string} - The filename to export the default export
 */
export const EXPORT_FILENAME: string = 'filename';

/**
 * The default filename for the generated barrel file.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(DEFAULT_FILENAME);
 *
 * @returns {string} - The default filename
 */
export const DEFAULT_FILENAME: string = 'index';

/**
 * A template for an optional header comment in the barrel file.
 * @type {string[]}
 * @public
 * @memberof Constants
 * @example
 * console.log(HEADER_COMMENT_TEMPLATE);
 *
 * @returns {string[]} - The default header comment template
 */
export const HEADER_COMMENT_TEMPLATE: string[] = [];

/**
 * Flag to omit semicolons at the end of export statements.
 * @type {boolean}
 * @public
 * @memberof Constants
 * @example
 * console.log(EXCLUDE_SEMICOLON);
 *
 * @returns {boolean} - The flag to exclude a semicolon at the end of a line
 */
export const EXCLUDE_SEMICOLON: boolean = false;

/**
 * Flag to use single quotes instead of double quotes for string literals.
 * @type {boolean}
 * @public
 * @memberof Constants
 * @example
 * console.log(USE_SINGLE_QUOTES);
 *
 * @returns {boolean} - The flag to use single quotes
 */
export const USE_SINGLE_QUOTES: boolean = true;

/**
 * The end of line character sequence ('lf' or 'crlf').
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(END_OF_LINE);
 *
 * @returns {string} - The end of line character
 */
export const END_OF_LINE: string = 'lf';

/**
 * Flag to ensure a final newline at the end of the barrel file.
 * @type {boolean}
 * @public
 * @memberof Constants
 * @example
 * console.log(INSERT_FINAL_NEWLINE);
 *
 * @returns {boolean} - The flag to insert a final newline
 */
export const INSERT_FINAL_NEWLINE: boolean = true;

/**
 * Strategy for sorting the export statements.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(SORT_EXPORTS);
 *
 * @returns {string} - The strategy for sorting exports ('none', 'alphabetical', 'grouped')
 */
export const SORT_EXPORTS: string = 'none';

/**
 * The default current workspace string.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(CURRENT_WORKSPACE);
 *
 * @returns {string} - The default current workspace string
 */
export const CURRENT_WORKSPACE: string = '';
