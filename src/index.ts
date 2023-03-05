import { PluginOption } from 'vite'
import minimist from 'minimist'
import CI, { MiniCIPluginOpt, DevelopTool } from './CI'

export default function miniCIPlugin (option: MiniCIPluginOpt): PluginOption {
  return {
    name: 'miniCIPlugin',
    buildEnd () {
      const argv = minimist(process.argv.slice(2))
      const developTool = argv.p as DevelopTool
      if (!developTool || !['mp-alipay', 'mp-weixin'].includes(developTool)) return

      const isBuild = !!argv._[0]

      const ci = new CI({
        ...option,
        isBuild,
        developTool
      })
      const { VITE_PLUGIN_MINI_CI } = process.env
      const CIMethods = (VITE_PLUGIN_MINI_CI || '').split(',')
      if (CIMethods.includes('open')) {
        ci.open()
      }
      if (CIMethods.includes('preview')) {
        ci.preview()
      }
      if (CIMethods.includes('upload')) {
        ci.upload()
      }
    }
  }
}
