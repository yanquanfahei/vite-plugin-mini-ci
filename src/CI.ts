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
  open: () => void
  preview: () => void
  upload: () => void
}

export default class CI {
  option: CIOption
  context!: IContext
  constructor (option: CIOption) {
    const projectPath = getProjectPath(option.isBuild, option.developTool)
    this.option = option

    if (this.isAlipayMp) {
      this.context = new AlipayCI(projectPath, option.alipayOpt)
    }
  }

  open () {
    this.context.open()
  }

  preview () {
    this.context.preview()
  }

  upload () {
    this.context.upload()
  }

  get isAlipayMp () {
    const { developTool } = this.option
    return developTool === 'mp-alipay'
  }
}
