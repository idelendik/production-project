const { capitalize } = require("../helpers");

module.exports = (componentName) => `export { ${capitalize(componentName)} } from "./ui/${capitalize(componentName)}/${capitalize(componentName)}";
export { ${capitalize(componentName)}Schema } from "./model/types/${componentName}Schema";`;