import { PluginOption } from 'vite'
import minimist from 'minimist'
import CI, { MiniCIPluginOpt, DevelopTool } from './CI'

export default function miniCIPlugin (option: MiniCIPluginOpt): PluginOption {
  return {
    name: 'miniCIPlugin',
    buildEnd () {
      const argv = minimist(process.argv.slice(2))
      const developTool = argv.p as DevelopTool
      if (!developTool || !['mp-alipay'].includes(developTool)) return

      const isBuild = !!argv._[0]

      const ci = new CI({
        ...option,
        isBuild,
        developTool
      })
      const { VITE_PLUGIN_MINI_CI } = process.env

      if (VITE_PLUGIN_MINI_CI === 'open') {
        ci.open()
      } else if (VITE_PLUGIN_MINI_CI === 'preview') {
        ci.preview()
      } else if (VITE_PLUGIN_MINI_CI === 'upload') {
        ci.upload()
      }
    }
  }
}
