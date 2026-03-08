/**
 * Unique identifiers for all commands registered by the extension.
 * These match the command IDs defined in package.json.
 */
export enum CommandIds {
  /** Command to switch the active workspace folder used for configuration. */
  ChangeWorkspace = 'changeWorkspace',

  /** Command to generate a new barrel file in the selected directory. */
  CreateBarrel = 'createBarrel',

  /** Command to update an existing barrel file in the selected directory. */
  UpdateBarrelInFolder = 'updateBarrelInFolder',

  /** Command to update a specific barrel file directly. */
  UpdateBarrel = 'updateBarrel',
}
