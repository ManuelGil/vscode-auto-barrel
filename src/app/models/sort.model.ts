/**
 * Represents the available sorting strategies for generated export statements.
 * These match the configuration options defined in the extension settings.
 *
 * - 'none': Do not sort exports. Preserve the order in which they were discovered.
 * - 'alphabetical': Sort exports alphabetically by their primary exported symbol name.
 * - 'path': Sort exports alphabetically by their module path.
 */
export type SortModel = 'none' | 'alphabetical' | 'path';
