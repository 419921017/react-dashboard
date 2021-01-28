import path from 'path'

function getModulesFiles(pathUrl: string, useSubdirectories: boolean, regExp: RegExp) {
  pathUrl = path.resolve(pathUrl)
  const modulesFiles: __WebpackModuleApi.RequireContext = require.context(pathUrl, useSubdirectories, regExp)
  const modules = modulesFiles.keys().reduce(
    (module, modulePath) => {
      // set './app.js' => 'app'
      const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
      const value = modulesFiles(modulePath)
      module[moduleName] = value.default
      return module
    },
    {} as {
      [propName: string]: any
    },
  )
  return modules
}

export default getModulesFiles
