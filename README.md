## Typescript unit tests

## Manually Setting up projects

The `.\installCmd.sh` file contains `npm install` commands if you want to use same npm package in your existing projects.

The `.vscode\launch.json` file contains settings for debugging the code in VS Code editor.

The `.\Package.json` file contains scripts for executing tests.


Also,`.\tsconfig.json` file is generated using `tsc --init` command


## Test Execution

The tests are executed using

```sh
npm t
```

(which is short for `npm run test`)

To get test coverage

```sh
npm run coverage
```
