const inquirer = require('inquirer')
const path = require('path')

const writeTemplateList = require('../util').writeTemplateList

module.exports = inquirer.prompt([
    {
        type: 'confirm',
        name: 'isConfirm',
        message: 'Delete all templates ?',
        default: true
    }
])
.then(({ isConfirm }) => {
    if(!isConfirm) return 
    writeTemplateList({}, path.resolve(__dirname, '../template.json'))
})