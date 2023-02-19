import { PluginOption } from 'vite'
import minimist from 'minimist'
import CI, { MiniCIPluginOpt, DevelopTool } from './CI'

export default function miniCIPlugin (option?: MiniCIPluginOpt): PluginOption {
  return {
    name: 'miniCIPlugin',
    buildEnd () {
      const argv = minimist(process.argv.slice(2))
      console.log(argv)
      const developTool = argv.p as DevelopTool
      if (!developTool || !['mp-alipay'].includes(developTool)) return

      const isBuild = !!argv._[0]

      const ci = new CI({
        ...(option || {}),
        isBuild,
        developTool
      })

      ci.preview()
    }
  }
}
