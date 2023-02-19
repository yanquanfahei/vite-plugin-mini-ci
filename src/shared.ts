import { resolve } from 'node:path'
import { DevelopTool } from './CI'
const cwd = process.cwd()

export function getProjectPath (isBuild: boolean, developTool: DevelopTool): string {
  return resolve(cwd, `./dist/${isBuild ? 'build' : 'dev'}/${developTool}`)
}
