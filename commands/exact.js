const fs = require('fs')
const path = require('path')
const json = require('format-json')
const inquirer = require('inquirer')
const checkTemplateList = require('../util').checkTemplateList
const writeTemplateList = require('../util').writeTemplateList

let templateList = checkTemplateList(path.resolve(__dirname, '../template.json'))

module.exports = inquirer.prompt([
    {
        type: 'input',
        name: 'dest',
        message: 'Input the path you want to exact the template.json to.',
        validate(val){
            val = val.trim()
            if(!val || !val.length){
                return 'Path can not be empty. You can input `pwd` in your terminal to check the path.'
            }
            return true
        }
    }
])
.then(({ dest }) => {
    const jsonPath = path.resolve(__dirname, dest, 'template.json')
    
    fs.openSync(jsonPath, 'w')
    writeTemplateList(templateList, jsonPath)
})