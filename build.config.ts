import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index'
  ],
  failOnWarn: false,
  declaration: true,
  externals: ['vite'],
  rollup: {
    emitCJS: true
  }
})
