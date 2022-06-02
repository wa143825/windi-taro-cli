/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-06-02 11:23:02
 * @Description: 头部注释配置模板
 */
const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const inquirer = require('inquirer')
const process = require('process')
const cmd = require('node-cmd')
const { basic } = require('./basic')

const create = async (name, option) => {
  const version = parseInt(process.version.match(/\d{1,2}/)[0])
  if (version < 14) {
    console.log(chalk.red('您的nodejs版本小于14，请先进行升级'))
    return
  }

  const cwd = process.cwd()
  const targetAir = path.join(cwd, name)

  if (fs.existsSync(targetAir)) {
    if (option.force) {
      await fs.remove(targetAir)
    } else {
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: '文件名已存在，是否要强制删除本目录',
          choices: [
            {
              name: '删除',
              value: true,
            },
            {
              name: '取消',
              value: false,
            },
          ],
        },
      ])
      if (!action) {
        return console.log('取消')
      } else if (action) {
        await fs.remove(targetAir)
        console.log(chalk.red('🤡移除已存在目录'))
      }
    }
  } else {
    fs.mkdir(name)
    console.log('目录创建成功')
    basic(name, targetAir)
  }
}

module.exports = {
  create,
}
