# pharah
A cli that aims to managing template code.

## 目的
公司产品线越来越多，不同产品会使用到不同的代码模板，希望通过一款工具来管理所有的模板。

## 细化需求
- 模板代码通过一份json来管理，暂时默认模块放置于github上。每份模板包含了以下信息：name(模板别名)，owner/project_name(github上的仓库地址)，branch(分支名，同一个仓库不同分支可以属于不同的模板)；

- 模板配置表可以通过update命令更新 /* TODO */

- 模板配置包含以下几个操作: add / delete / list / patch。分别对应增删查改

- 使用模板: ```pharah init <name>```

## 项目结构
