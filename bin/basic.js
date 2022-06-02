/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-06-02 10:56:14
 * @Description: 头部注释配置模板
 */
const inquirer = require('inquirer')
const Creator = require('./Creator')

const basic = async (name, targetAir) => {
  const prompt = await inquirer.prompt([
    {
      name: 'author',
      type: 'input',
      message: '请输入项目的作者',
    },
    {
      name: 'desc',
      type: 'input',
      message: '请输入项目介绍',
    },
    {
      name: 'appid',
      type: 'input',
      message: '请输入小程序appId',
    },
    {
      name: 'action',
      type: 'list',
      message: '请选择使用的包管理工具',
      choices: [
        {
          name: 'npm',
          value: 'npm',
        },
        {
          name: 'yarn',
          value: 'yarn',
        },
      ],
    },
  ])

  const { author, desc, appid, action } = prompt

  const c = new Creator(name, targetAir, author, desc, appid, action)

  c.create()
}

module.exports = {
  basic,
}
