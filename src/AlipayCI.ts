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
  constructor (opt?: AlipayCIOpt) {
    this.opt = opt || { appId: '' }
  }

  open (projectPath: string) {
    const { openOpt } = this.opt
    const project = openOpt?.project || projectPath

    minidev.startIde({
      ...(openOpt || {}),
      project
    })
  }

  async preview (projectPath: string) {
    const { authentication, previewOpt, appId } = this.opt
    const { privateKey, toolId } = authentication || {}

    if (!privateKey || !toolId) {
      console.log('真机预览前需要授权信息请依照 https://opendocs.alipay.com/mini/02q29w 地址设置 authentication.privateKey 和 authentication.toolId')
      return
    }

    await minidev.config.useRuntime({
      'alipay.authentication.privateKey': privateKey,
      'alipay.authentication.toolId': toolId
    })

    const project = previewOpt?.project || projectPath

    minidev.preview({
      appId,
      project,
      ...(previewOpt || {})
    })
  }

  async upload (projectPath: string) {
    const { authentication, uploadOpt, appId } = this.opt
    const { privateKey, toolId } = authentication || {}

    if (!privateKey || !toolId) {
      console.log('上传前需要授权信息请依照 https://opendocs.alipay.com/mini/02q29w 地址设置 authentication.privateKey 和 authentication.toolId')
      return
    }

    await minidev.config.useRuntime({
      'alipay.authentication.privateKey': privateKey,
      'alipay.authentication.toolId': toolId
    })

    const project = uploadOpt?.project || projectPath

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
}
