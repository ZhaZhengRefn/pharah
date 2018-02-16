const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')

const writeTemplateList = require('../util').writeTemplateList
const checkTemplateList = require('../util').checkTemplateList

let templateList = checkTemplateList(path.resolve(__dirname, '../template.json'))

module.exports = inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'input the name of this template:',
        validate(val){
            val = val.trim()
            if(!val || !val.length){
                return 'The name of template can not be empty.'
            }
            if(templateList.hasOwnProperty(val)){
                return 'The template is existed.'
            }
            return true
        },
        filter(val){
            return val.trim()
        }
    },
    {
        type: 'input',
        name: 'gitParams',
        message: 'input the ownerName/repositoryName, such as: tj/commander.js:',
        validate(val){
            val = val.trim()
            if(!val || !val.length){
                return 'Params of the repository can not be empty.'
            }
            if(!/^[\w\d]+\/[\S]+$/.test(val)){
                return 'Must deliver a valid params of repository.'
            }
            return true
        },
        filter(val){
            return val.trim()
        }        
    },
    {
        type: 'input',
        name: 'branch',
        message: 'input the branch name where this template belongs to:',
        validate(val){
            val = val.trim()
            if(!val || !val.length){
                return 'The branch name can not be empty.'
            }
            return true
        },
        filter(val){
            return val.trim()
        }
    }    
])
.then(({ name, gitParams, branch }) => {
    templateList = Object.assign(templateList, {
        [name]: {
            'owner/name': gitParams,
            'branch': branch
        }
    })
    writeTemplateList(templateList, path.resolve(__dirname, '../template.json'))
})