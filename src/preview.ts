import { minidev, IPreviewArgs } from 'minidev'

export async function previewAlipay (opt: IPreviewArgs) {
  await minidev.login({})
  minidev.preview(opt)
}
