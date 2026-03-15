import { Uri, workspace } from 'vscode';

/**
 * Shared UTF-8 decoder reused across reads to avoid unnecessary allocations.
 */
const utf8Decoder = new TextDecoder('utf-8');

/**
 * Reads a file from the workspace filesystem and returns its decoded UTF-8 content.
 *
 * This utility performs a direct filesystem read without opening the VS Code
 * editor document model, making it suitable for batch processing scenarios
 * such as code analysis and barrel generation.
 *
 * @param fileUri - URI of the file to read.
 * @returns Decoded text content of the file.
 */
export const readFileContent = async (fileUri: Uri): Promise<string> => {
  const fileBytes = await workspace.fs.readFile(fileUri);
  return utf8Decoder.decode(fileBytes);
};
