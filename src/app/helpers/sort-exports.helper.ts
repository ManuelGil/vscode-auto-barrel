import { SortModel } from '../models/sort.model';

/**
 * Sorts export statements based on the configured mode.
 * The original array is never mutated.
 *
 * @param exportLines - The array of export lines to sort.
 * @param sortMode - The sorting strategy to apply.
 * @returns A new array containing the sorted export lines.
 */
export const sortExports = (
  exportLines: string[],
  sortMode: SortModel,
): string[] => {
  // Explicitly preserve original order if sorting is disabled
  if (sortMode === 'none') {
    return exportLines;
  }

  // Create a defensive copy to guarantee immutability of the original array
  const copiedExportLines = [...exportLines];

  return copiedExportLines.sort((firstLine, secondLine) => {
    switch (sortMode) {
      case 'alphabetical': {
        const firstExportName = extractPrimaryExportName(firstLine);
        const secondExportName = extractPrimaryExportName(secondLine);
        return firstExportName.localeCompare(secondExportName);
      }

      case 'path': {
        const firstModulePath = extractModulePath(firstLine);
        const secondModulePath = extractModulePath(secondLine);
        return firstModulePath.localeCompare(secondModulePath);
      }

      default:
        // Defensive fallback for unexpected configuration values
        return 0;
    }
  });
};

/**
 * Extracts the primary exported symbol name from an export line.
 *
 * Supported patterns:
 *   export { A }
 *   export { A as B }
 *   export type { A }
 *   export { type A }
 *
 * If extraction fails, returns the original line to keep sorting stable.
 *
 * @param exportLine - The export statement line to parse.
 * @returns The extracted symbol name or the original line.
 */
const extractPrimaryExportName = (exportLine: string): string => {
  const exportBlockMatch = exportLine.match(/\{([^}]+)\}/);

  if (!exportBlockMatch) {
    return exportLine;
  }

  const blockContent = exportBlockMatch[1]
    .replace(/\btype\b/g, '') // Remove the "type" keyword
    .trim();

  // Take the first exported symbol (before the comma if there are multiple)
  const firstExportedSymbol = blockContent.split(',')[0].trim();

  // Handle aliasing: "A as B" → "A"
  const originalSymbolName = firstExportedSymbol.split(/\s+as\s+/i)[0].trim();

  return originalSymbolName || exportLine;
};

/**
 * Extracts the module path from an export line.
 *
 * Supported patterns:
 *   from './module'
 *   from "./module"
 *
 * If extraction fails, returns the original line for stable sorting.
 *
 * @param exportLine - The export statement line to parse.
 * @returns The extracted module path or the original line.
 */
const extractModulePath = (exportLine: string): string => {
  const pathRegexMatch = exportLine.match(/from\s+(['"])(.*?)\1/);

  return pathRegexMatch?.[2] ?? exportLine;
};
