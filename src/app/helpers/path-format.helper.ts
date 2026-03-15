/**
 * Normalizes filesystem paths to POSIX-style separators for cross-platform compatibility.
 */
export const toPosixPath = (filePath: string): string => {
  return filePath.replace(/\\/g, '/');
};
