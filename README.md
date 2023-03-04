# vite-plugin-mini-ci

小程序 CI 集成，打开小程序开发工具、上传并生成体验码、生成预览二维码

## Install

```shell
pnpm add cross-env vite-plugin-mini-ci -D
```

## Usage

1. 在项目运行脚本中添加环境变量参数 `VITE_PLUGIN_MINI_CI`，以英文逗号分割来执行多个指令。

```json
// package.json
{
  "scripts": {
    "dev:mp-alipay": "cross-env VITE_PLUGIN_MINI_CI=open,preview uni -p mp-alipay"
  }
}
```

2. 添加 `vite-plugin-mini-ci` 插件

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import miniCI from 'vite-plugin-mini-ci'
export default defineConfig({
  plugins: [uni(), miniCI({
    alipayOpt: {
      appId: '2021003139676331',
      openOpt: {
        appPath: 'D:\\mp-alipay\\小程序开发者工具'
      }
    }
  })]
})
```

## 支付宝 CI

[官方CI文档](https://opendocs.alipay.com/mini/02q17h)

支付宝真机预览 `preview` 以及 `upload` 需要 [授权信息](https://opendocs.alipay.com/mini/02q29w)

## 微信 CI

[官方CI文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html)

[官方CI包](https://www.npmjs.com/package/miniprogram-ci)
