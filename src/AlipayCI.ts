import { minidev, IIDECommandOptions, IPreviewArgs, IUploadOptions } from 'minidev'

export interface AlipayCIOpt {
  /**
   * 小程序 appId
   */
  appId: string
  /**
   * 身份验证：密钥和工具ID
   * https://open.alipay.com/dev/workspace/key-manage/tool
   */
  authentication?: {
    privateKey: string
    toolId: string
  },
  /**
   * 打开 IDE 的参数
   */
  openOpt?: IIDECommandOptions
  /**
   * 生成预览码
   */
  previewOpt?: IPreviewArgs
  /**
   * 上传
   */
  uploadOpt?: IUploadOptions
}

export default class AlipayCI {
  opt: AlipayCIOpt
  projectPath: string
  constructor (projectPath: string, opt?: AlipayCIOpt) {
    this.opt = opt || { appId: '' }
    this.projectPath = projectPath
  }

  open () {
    const { openOpt } = this.opt
    const project = openOpt?.project || this.projectPath

    minidev.startIde({
      ...(openOpt || {}),
      project
    })
  }

  async preview () {
    if (!await this.verifyAuth()) return

    const { previewOpt, appId } = this.opt

    const project = previewOpt?.project || this.projectPath

    minidev.preview({
      appId,
      project,
      ...(previewOpt || {})
    })
  }

  async upload () {
    if (!await this.verifyAuth()) return
    const { uploadOpt, appId } = this.opt

    const project = uploadOpt?.project || this.projectPath

    const uploadResult = await minidev.upload({
      appId,
      project,
      ...(uploadOpt || {})
    }, {
      onLog (data) {
        console.log(data)
      }
    })

    console.log(uploadResult.version)
  }

  async verifyAuth (): Promise<boolean> {
    const { authentication } = this.opt
    const { privateKey, toolId } = authentication || {}
    if (!privateKey || !toolId) {
      console.log('此操作需要授权信息请依照 https://opendocs.alipay.com/mini/02q29w 地址配置参数 authentication.privateKey 和 authentication.toolId')
      return false
    }

    await minidev.config.useRuntime({
      'alipay.authentication.privateKey': privateKey,
      'alipay.authentication.toolId': toolId
    })

    return true
  }
}
