import getModulesFiles from '../../../utils/moduelFiles'

const schemaFiles = getModulesFiles('../Schema', true, /\.js$|\.ts$/)

export default schemaFiles
