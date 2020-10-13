## ORM

## Unit Test

* lib: [jest](https://jestjs.io/en/)
* config: jest.config.file
* command: npm run test

## Others

### 路径别名

采用了 ts 的路径别名 (tsconfig.json 配置); <br>
但运行时有坑, 参考 package.json 中以下指令:

```
npm run dev
npm run product
npm run start
```

## Lint

### typescript-eslint

> main lint rule: standard-with-typescript'

* config
  * .eslintignore
  * .eslintrc.js

### vscode config

> setting.json

```
{
  "eslint.validate": [
      "javascript",
      "javascriptreact",
      "typescript"
  ],
  "typescript.tsdk": "node_modules/typescript/lib"
}
```


### Publish

> 注: package.json -> name -> @dt/itachi_orm 使用时注意

* npm `login` --registry=http://nexus.downtown8.com:8081/repository/npm-hosted
  * user: downtown
  * pwd: downtown#2013
  * email: ...
* `tsc`
* package.json
  * `version++` (不支持原版本更新)
* npm `publish` --registry=http://nexus.downtown8.com:8081/repository/npm-hosted

> 如果有权限问题, 把各个 registry logout 下, 然后再试试
# itachi_orm
