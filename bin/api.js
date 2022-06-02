/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-05-18 10:10:38
 * @Description: 头部注释配置模板
 */
const axios = require('axios')

// 拦截全局请求响应
axios.interceptors.response.use((res) => {
	return res.data
})

/**
 * 获取模板
 * @returns Promise
 */
async function getWoqiTemplate() {
	return axios.get('https://api.github.com/repos/wa143825/taro-template')
}

/**
 * 获取仓库下的版本
 * @param {string} repo 模板名称
 * @returns Promise
 */
// async function getTagsByRepo(repo) {
//   return axios.get(`https://api.github.com/repos/zhurong-cli/${repo}/tags`);
// }

module.exports = {
	getWoqiTemplate,
}
