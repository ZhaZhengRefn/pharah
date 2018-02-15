const inquirer = require('inquirer')
const path = require('path')

const writeTemplateList = require('../util').writeTemplateList
let templateList = require('../template.json')

module.exports = inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Which template would you want to delete ?',
        validate(val){
            val = val.trim()
            if(!val || !val.length) {
                return 'Name can not be empty.'
            }
            if(!templateList.hasOwnProperty(val)){
                return 'The template does not exist. Make sure you have input the right name.'
            }
            return true
        },
        filter(val){
            return val.trim()
        }
    },
    {
        type: 'confirm',
        name: 'isConfirm',
        message: 'Deleting a template can not be reverted. Sure?',
        default: true
    }
])
.then(({ name, isConfirm }) => {
    if(!isConfirm) return

    delete templateList[name]
    writeTemplateList(templateList, path.resolve(__dirname, '../template.json'))
})