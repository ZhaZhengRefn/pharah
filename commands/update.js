const inquirer = require('inquirer')
const path = require('path')

let templateList = require('../template.json')
const showTemplateList = require('../util').showTemplateList
const writeTemplateList = require('../util').writeTemplateList

module.exports = inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'input the name of the template that you want to update:   ',
        validate(val){
            val = val.trim()
            if(!val || !val.length){
                return 'The name of template can not be empty.'
            }
            if(!templateList.hasOwnProperty(val)){
                return 'The template does not exist.'
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
        message: 'input the ownerName/repositoryName, such as: tj/commander.js:   ',
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
        message: 'input the branch name where this template belongs to:   ',
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
    templateList[name] = {
        "owner/name": gitParams,
        "branch": branch
    }
    writeTemplateList(templateList, path.resolve(__dirname, '../template.json'))
})