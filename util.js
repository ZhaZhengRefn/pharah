const format = require('format-json')
const fs = require('fs')
const chalk = require('chalk')

function getSingleton(fn){
    let result = null
    return function(){
        return !result ? result = fn() : result
    }
}

function createTable(){
    const Table = require('cli-table')
    
    const table = new Table({
        head: ['Template Name', 'Owner/Name', 'Branch'],
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
        , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
        , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
        , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },    
        style: {
            border: ['blue'],
            head: ['grey']
        }
    })

    return table
}

const getTable = getSingleton(createTable)

function showTemplateList(list){
    const table = getTable()
    const tableList = Object.keys(list).map(k => {
        const cur = list[k]
        return [k, cur['owner/name'], cur['branch']]
    })
    table.push(...tableList)

    console.log(table.toString())
}

function writeTemplateList(list, jsonPath, msg = 'Writing templates successfully!'){
    if(arguments.length < 2) throw new Error('lack of params.')

    fs.writeFile(jsonPath, format.plain(list), 'utf8',(err) => {
        if(err){
            console.log('err')
        } else {
            console.log(chalk.green(`\u2714 ${msg}`))
            showTemplateList(list)
        }
    })    
}

function checkTemplateList(jsonPath){
    try {
        fs.statSync(jsonPath)
    } catch (error) {
        fs.openSync(jsonPath, 'w')
        fs.writeFileSync(jsonPath, '{}')
    }
    return require(jsonPath)
}

exports.showTemplateList = showTemplateList

exports.writeTemplateList = writeTemplateList

exports.checkTemplateList = checkTemplateList