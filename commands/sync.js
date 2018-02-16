const download = require('download')
const path = require('path')
const inquirer = require('inquirer')
const writeTemplateList = require('../util').writeTemplateList
const checkTemplateList = require('../util').checkTemplateList

let templateList = checkTemplateList(path.resolve(__dirname, '../template.json'))

module.exports = inquirer.prompt([
    {
        type: 'input',
        name: 'url',
        message: 'Url of the template.json: ',
        validate(val){
            val = val.trim()
            if(!val || !val.length){
                return 'Url can not be empty.'
            }
            return true
        },
        filter(val){
            val = val.trim()
            if(val.substring(0, 2) === '//') val = 'http:' + val
            return val
        }
    },
    {
        type: 'list',
        name: 'mode',
        message: 'Merge or Replace your current template? ',
        choices: [
            'merge', 'replace'
        ]
    }
])
.then(({ url, mode }) => {
    download(url, path.resolve(__dirname, '../'), { encoding: 'utf8' })
    .then(data => {
        
        try {
            data = JSON.parse(data)
        } catch (error) {
            throw new Error('Template is not a json!')
        }

        if(mode === 'merge'){
            templateList = Object.assign(templateList, data)
        } else if(mode === 'replace'){
            templateList = data
        }
        writeTemplateList(templateList, path.resolve(__dirname, '../template.json'))
    })
})