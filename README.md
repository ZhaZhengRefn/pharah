# Pharah
A cli that aims to managing template code.
![Pharah][1]

## Usage

### Notice
pharah-cli aims to managing template code by maintaining a JSON of all template repository.

You could specify a template with owner, repository and branch. Like this:
![intro][2]

### Install
```sh
npm install -g pharah-cli
```

### Show all templates
```sh
//In
$ pharah list

//out
╔═══════════════╤═════════════════════╤════════╗
║ Template Name │ Owner/Name          │ Branch ║
╟───────────────┼─────────────────────┼────────╢
║ pharah        │ ZhaZhengRefn/pharah │ master ║
╚═══════════════╧═════════════════════╧════════╝
```

### Add an template
```sh
$ pharah add

? input the name of this template: pharah
? input the ownerName/repositoryName, such as: tj/commander.js: ZhaZhengRefn/pharah
? input the branch name where this template belongs to: master

╔═══════════════╤═════════════════════╤════════╗
║ Template Name │ Owner/Name          │ Branch ║
╟───────────────┼─────────────────────┼────────╢
║ pharah        │ ZhaZhengRefn/pharah │ master ║
╚═══════════════╧═════════════════════╧════════╝
```

### Init a new project with the template
```sh
$ pharah init

? Which template would you like to use ? pharah
? Input the name of new project. pharah-demo
? Input the path that you want to init the project. /Users/zhazheng/www/my_project
✔ Init the project successfully!
```

### Delete a template or all of them
```sh
$ pharah delete

? Which template would you want to delete ? pharah
? Deleting a template can not be reverted. Sure? Yes
✔ Writing templates successfully!
╔═══════════════╤════════════╤════════╗
║ Template Name │ Owner/Name │ Branch ║
╚═══════════════╧════════════╧════════╝
```

```sh
$ pharah delete --all

? Delete all templates ? Yes
✔ Writing templates successfully!
╔═══════════════╤════════════╤════════╗
║ Template Name │ Owner/Name │ Branch ║
╚═══════════════╧════════════╧════════╝
```

### Update a template
```sh
$ pharah update

? input the name of the template that you want to update: pharah
? input the ownerName/repositoryName, such as: tj/commander.js: ZhaZhengRefn/pharah
? input the branch name where this template belongs to: develop  //here, change the branch name.
✔ Writing templates successfully!
╔═══════════════╤═════════════════════╤═════════╗
║ Template Name │ Owner/Name          │ Branch  ║
╟───────────────┼─────────────────────┼─────────╢
║ pharah        │ ZhaZhengRefn/pharah │ develop ║
╚═══════════════╧═════════════════════╧═════════╝
```

### Sync the template list from remote
```sh
$ pharah sync

? Url of the template.json:  http://www.refn.com/template.json
? Merge or Replace your current template?  (Use arrow keys)
❯ merge
  replace
```

### Exact the template to a specific path
You could input `pwd` to get the path.
```sh
$ pharah exact
? Input the path you want to exact the template.json to. /Users/zhazheng/www/my_project


✔ Writing templates successfully!
╔═══════════════╤═════════════════════╤═════════╗
║ Template Name │ Owner/Name          │ Branch  ║
╟───────────────┼─────────────────────┼─────────╢
║ pharah        │ ZhaZhengRefn/pharah │ develop ║
╚═══════════════╧═════════════════════╧═════════╝
```

 [1]: http://o8swwgh2r.bkt.clouddn.com/Pharah.full.2043469.jpg
 [2]: http://o8swwgh2r.bkt.clouddn.com/pharah-intro.jpg
