const download = require('download-git-repo')
const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')

const checkTemplateList = require('../util').checkTemplateList

let templateList = checkTemplateList(path.resolve(__dirname, '../template.json'))

module.exports = inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Which template would you like to use ?',
        validate(val){
            val = val.trim()
            if(!val || !val.length){
                return 'Name can not be empty.'
            }
            if(!templateList.hasOwnProperty(val)){
                return 'The template does not exit.'
            }
            return true
        },
        filter(val){
            return val.trim()
        }
    },
    {
        type: 'input',
        name: 'projectName',
        message: 'Input the name of new project.',
        validate(val){
            val = val.trim()
            if(!val || !val.length){
                return 'Name can not be empty.'
            }
            return true
        },
        filter(val){
            return val.trim()
        }
    },    
    {
        type: 'input',
        name: 'dest',
        message: 'Input the path that you want to init the project.',
        default: './'
    }
])
.then(({ name, projectName, dest }) => {
    const initPath = path.resolve(dest, projectName)
    const { 'owner/name': gitParams, branch } = templateList[name]

    download(`${gitParams}#${branch}`, initPath, function (err) {
        if(err){
            console.log(err)
        } else {
            console.log(chalk.green(`\u2714 Init the project successfully!`))
        }
    })    
})