import { openAlipayTool, AlipayOpt } from './open'
import { getProjectPath } from './shared'

export type DevelopTool = 'mp-alipay' | undefined

export interface MiniCIPluginOpt {
  alipayOpt?: AlipayOpt
}

export interface CIOption extends MiniCIPluginOpt {
  projectPath?: string
  isBuild: boolean
  developTool: DevelopTool
}

export default class CI {
  option: CIOption
  constructor (option: CIOption) {
    option.projectPath = getProjectPath(option.isBuild, option.developTool)
    this.option = option
  }

  open () {
    const { developTool, alipayOpt, projectPath } = this.option
    if (developTool === 'mp-alipay') {
      openAlipayTool(alipayOpt?.appPath, projectPath)
    }
  }
}
