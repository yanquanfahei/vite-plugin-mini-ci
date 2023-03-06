import { join } from 'path'
import { execFileSync } from 'child_process'
import { existsSync } from 'node:fs'
import CI from 'miniprogram-ci'
import prompts from 'prompts'
import { isWindows } from './shared'

/**
 * https://www.npmjs.com/package/miniprogram-ci
 */
export interface WechatCIOpt {
  /**
   * 开发工具的安装路径
   */
  installPath?: string,
  projectPath?: string
  version?: string
  projectOpt: {
    appid: string
    projectPath?: string
    privateKey?: string
    privateKeyPath?: string
    type?: 'miniProgram' | 'miniProgramPlugin' | 'miniGame' | 'miniGamePlugin'
    ignores?: string[]
  }
}

export default class WechatCI {
  opt: WechatCIOpt
  projectPath: string
  installPath: string
  CIPath: string
  project: CI.Project
  constructor (projectPath: string, opt?: WechatCIOpt) {
    this.opt = opt || { projectOpt: { appid: '' } }
    this.projectPath = opt?.projectPath || projectPath
    this.installPath = this.opt?.installPath || this.getCIDefaultPath()
    this.CIPath = join(this.installPath, isWindows ? '/cli.bat' : '/Contents/MacOS/cli')

    const { appid, type } = this.opt.projectOpt

    this.project = new CI.Project({
      ...this.opt.projectOpt,
      appid,
      projectPath: this.projectPath,
      type: type || 'miniProgram'
    })
  }

  open () {
    if (!this.verifyInstallPath()) return
    execFileSync(`${this.CIPath}`, ['open', '--project', this.projectPath])
  }

  async preview () {
    if (!this.verifyInstallPath()) return
    await CI.preview({
      project: this.project,
      version: '',
      qrcodeFormat: 'terminal'
    })
  }

  async upload () {
    if (!this.verifyInstallPath()) return

    const result = await prompts([
      {
        type: 'text',
        name: 'version',
        message: '输入你的版本号'
      },
      {
        type: 'text',
        name: 'desc',
        message: '输入你的版本描述'
      }
    ])

    await CI.upload({
      project: this.project,
      version: result.version || '0.0.1',
      desc: result.desc || ''
    })
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
