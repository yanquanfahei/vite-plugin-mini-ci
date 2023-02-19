import { minidev } from 'minidev'

export function openAlipayTool (appPath?: string, projectPath?: string) {
  minidev.startIde({
    appPath,
    project: projectPath
  })
}
