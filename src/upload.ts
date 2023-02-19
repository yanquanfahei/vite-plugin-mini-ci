import { minidev } from 'minidev'

export interface AlipayUploadOpt {
    /**
   * 上传的版本号，如果不传入，会尝试从后台拉取版本后自动添加一位 patch 号 (例: 1.1.1 => 1.1.2)
   * 参考语义化版本:
   * [major].[minor].[patch]
   */
    version?: string
    /**
    * 上传成功后，自动设置为体验版本 (需要对应权限)
    */
    experience?: boolean
    /**
     * 上传时删除指定版本号
     */
    deleteVersion?: string;
}

export async function uploadAlipay (appId: string, opt?: AlipayUploadOpt) {
  minidev.login({})
  minidev.upload({ appId, ...(opt || {}) })
}
