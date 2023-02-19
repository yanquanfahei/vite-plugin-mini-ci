import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import miniCI from '../src/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), miniCI({
    alipayOpt: {
      appId: '2021003139676331',
      appPath: 'D:\\mp-alipay\\小程序开发者工具'
    }
  })]
})