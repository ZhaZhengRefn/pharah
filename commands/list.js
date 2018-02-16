const path = require('path')
const showTemplateList = require('../util').showTemplateList
const checkTemplateList = require('../util').checkTemplateList

let templateList = checkTemplateList(path.resolve(__dirname, '../template.json'))

module.exports = showTemplateList(templateList)