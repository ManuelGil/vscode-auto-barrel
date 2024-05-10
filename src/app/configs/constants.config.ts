/**
 * EXTENSION_ID: The unique identifier of the extension.
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
 * EXTENSION_NAME: The repository ID of the extension.
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
 * EXTENSION_DISPLAY_NAME: The name of the extension.
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
 * DEFAULT_LANGUAGE: The default language.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(DEFAULT_LANGUAGE);
 *
 * @returns {string} - The default language
 */
export const DEFAULT_LANGUAGE: string = 'typescript';

/**
 * RECURSIVE_BARRELLING: The flag to recursively barrel.
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
 * INCLUDE: The files to include.
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
 * EXCLUDE: The files to exclude.
 * @type {string[]}
 * @public
 * @memberof Constants
 * @example
 * console.log(EXCLUDE);
 *
 * @returns {string[]} - The files to exclude
 */
export const EXCLUDE_PATTERNS: string[] = [
  '**/node_modules/**',
  '**/dist/**',
  '**/out/**',
  '**/build/**',
  '**/coverage/**',
  '**/.*/**',
  '**/*.spec.*',
  '**/*.test.*',
  '**/*.e2e.*',
  '**/*.d.ts',
  '**/tsconfig.*',
  '**/index.*',
];

/**
 * KEEP_EXTENSION: The flag to keep the extension on export.
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
 * EXCLUDE_SEMICOLON: The flag to exclude a semicolon at the end of a line.
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
 * USE_SINGLE_QUOTES: The flag to use single quotes.
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
 * END_OF_LINE: The end of line character.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(END_OF_LINE);
 *
 * @returns {string} - The end of line character
 */
export const END_OF_LINE: string = 'lf';
