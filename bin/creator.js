/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-06-02 09:58:54
 * @Description: 头部注释配置模板
 */
const downloadGitRepo = require('download-git-repo')
const chalk = require('chalk')
const path = require('path')
const ora = require('ora')
const util = require('util')
const execSync = require('child_process').execSync
const spawnSync = require('child_process').spawnSync

const fs = require('fs')

const { getWoqiTemplate } = require('./api')

function sleep(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, n)
  })
}

class Creator {
  constructor(name, target, author, desc, appid, action, origin) {
    this.name = name
    this.target = target
    this.author = author
    this.desc = desc
    this.appid = appid
    this.action = action
    this.origin = origin

    this.downloadGitRepo = util.promisify(downloadGitRepo)
  }

  async create() {
    const repo = await this.getRepoInfo()
    await this.download()
  }

  async getRepoInfo() {
    let repo = await getWoqiTemplate()
    if (!repo) return
  }

  async download() {
    const downMsg = ora('正在下载模板，请稍后。。。')
    downMsg.start()
    let originUrl = {
      github: 'wa143825/taro-template',
      gitee: 'direct:https://gitee.com/wa143825/taro-template.git',
    }
    const downErr = await this.downloadGitRepo(originUrl[this.origin], this.target, { clone: true })
    if (!downErr) {
      downMsg.succeed('模板创建成功')
      let pack = path.join(this.target, 'package.json')
      let project = path.join(this.target, 'project.config.json')

      fs.readFile(pack, 'utf-8', (_, data) => {
        const json = JSON.parse(data)
        json['name'] = this.name
        json['description'] = this.desc
        json['author'] = this.author
        const newJson = JSON.stringify(json, null, 4)
        fs.writeFile(pack, newJson, 'utf-8', (err) => {})
      })

      fs.readFile(project, 'utf-8', (_, data) => {
        const json = JSON.parse(data)
        json['projectname'] = this.name
        json['description'] = this.desc
        json['appid'] = this.appid
        const newJson = JSON.stringify(json, null, 4)
        fs.writeFile(project, newJson, 'utf-8', (err) => {})
      })

      const installMsg = ora('准备安装依赖，请稍后。。。')
      installMsg.start()
      await execSync(this.action, { cwd: this.target })
      installMsg.succeed('依赖安装成功')

      spawnSync(process.env.SHELL, {
        cwd: this.target,
        stdio: 'inherit',
      })
    }
  }
}

module.exports = Creator
