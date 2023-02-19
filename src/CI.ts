import { getProjectPath } from './shared'
import { openAlipayTool } from './open'
import { previewAlipay } from './preview'

export type DevelopTool = 'mp-alipay' | undefined

interface AlipayOpt {
  appPath?: string,
  appId: string
}

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
    const { alipayOpt, projectPath } = this.option
    if (this.isAlipayMp) {
      openAlipayTool(alipayOpt?.appPath, projectPath)
    }
  }

  preview () {
    const { alipayOpt, projectPath } = this.option
    const { appId } = alipayOpt!
    if (this.isAlipayMp) {
      previewAlipay({
        appId,
        project: projectPath
      })
    }
  }

  get isAlipayMp () {
    const { developTool } = this.option
    return developTool === 'mp-alipay'
  }
}
