import { join } from 'path'
import { execFileSync } from 'child_process'
import { existsSync } from 'node:fs'
import CI from 'miniprogram-ci'
import { isWindows } from './shared'

export interface WechatCIOpt {
  /**
   * 开发工具的安装路径
   */
  installPath?: string,
  appId: string,
  projectPath?: string
  version?: string
}

export default class WechatCI {
  opt: WechatCIOpt
  projectPath: string
  installPath: string
  CIPath: string
  project: any
  constructor (projectPath: string, opt?: WechatCIOpt) {
    this.opt = opt || { appId: '' }
    this.projectPath = opt?.projectPath || projectPath
    this.installPath = this.opt?.installPath || this.getCIDefaultPath()
    this.CIPath = join(this.installPath, isWindows ? '/cli.bat' : '/Contents/MacOS/cli')

    this.project = new CI.Project({
      appid: opt!.appId,
      type: 'miniProgram',
      projectPath: this.projectPath
    })
  }

  open () {
    if (!this.verifyInstallPath()) return
    execFileSync(`${this.CIPath}`, ['open', '--project', this.projectPath])
  }

  async preview () {
    if (!this.verifyInstallPath()) return
    const previewQrcodePath = join(this.projectPath, 'preview.jpg')
    const previewResult = await CI.preview({
      project: this.project,
      version: '',
      qrcodeFormat: 'image',
      qrcodeOutputDest: previewQrcodePath
    })
    console.log(previewResult)
  }

  async upload () {
    if (!this.verifyInstallPath()) return
    const previewResult = await CI.upload({
      project: this.project,
      version: ''
    })
    console.log(previewResult)
  }

  getCIDefaultPath () {
    if (isWindows) {
      // windows 系统
      return 'C:\\Program Files (x86)\\Tencent\\微信web开发者工具'
    } else {
      return '/Applications/wechatwebdevtools.app'
    }
  }

  verifyInstallPath () {
    if (!existsSync(this.installPath)) {
      console.log('安装路径不存在，请传入开发者工具的安装路径')
      return false
    }
    return true
  }
}
