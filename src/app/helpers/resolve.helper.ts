import * as path from 'path';
import { Uri, window, workspace } from 'vscode';

/**
 * Resolves the destination folder URI where a barrel file should be created or updated.
 *
 * The returned URI always represents a directory, ensuring compatibility with
 * folder-based barrel generation workflows.
 *
 * Resolution order:
 * 1. Explicit URI provided by command invocation
 * 2. Directory of the active editor file
 * 3. First workspace folder root
 *
 * @param inputUri Optional URI provided by VS Code command execution
 * @returns A directory URI or undefined if no valid context exists
 */
export const resolveFolderResource = (inputUri?: Uri): Uri | undefined => {
  if (inputUri) {
    return asDirectoryUri(inputUri);
  }

  const activeFileUri = window.activeTextEditor?.document.uri;
  if (activeFileUri) {
    return asDirectoryUri(activeFileUri);
  }

  return workspace.workspaceFolders?.[0]?.uri;
};

/**
 * Ensures a URI points to a directory.
 * If the URI references a file, its parent directory is returned.
 *
 * @param uri File or directory URI
 * @returns Directory URI
 */
const asDirectoryUri = (uri: Uri): Uri => {
  const filePath = uri.fsPath;
  return path.extname(filePath) ? Uri.file(path.dirname(filePath)) : uri;
};
