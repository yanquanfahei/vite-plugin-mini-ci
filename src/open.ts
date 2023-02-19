import { minidev } from 'minidev'

export interface AlipayOpt {
  appPath?: string,
}

export function openAlipayTool (appPath?: string, projectPath?: string) {
  minidev.startIde({
    appPath,
    project: projectPath
  })
}
