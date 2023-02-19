import { getProjectPath } from './shared'
import AlipayCI, { AlipayCIOpt } from './AlipayCI'

export type DevelopTool = 'mp-alipay' | undefined
export interface MiniCIPluginOpt {
  alipayOpt?: AlipayCIOpt
}

export interface CIOption extends MiniCIPluginOpt {
  isBuild: boolean
  developTool: DevelopTool
}
interface IContext {
  open: (project: string) => void
  preview: (project: string) => void
  upload: (project: string) => void
}

export default class CI {
  option: CIOption
  context!: IContext
  projectPath: string
  constructor (option: CIOption) {
    this.projectPath = getProjectPath(option.isBuild, option.developTool)
    this.option = option

    if (this.isAlipayMp) {
      this.context = new AlipayCI(option.alipayOpt)
    }
  }

  open () {
    this.context.open(this.projectPath)
  }

  preview () {
    this.context.preview(this.projectPath)
  }

  upload () {
    this.context.upload(this.projectPath)
  }

  get isAlipayMp () {
    const { developTool } = this.option
    return developTool === 'mp-alipay'
  }
}
