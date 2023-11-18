const { capitalize } = require("../helpers");

module.exports = (componentName) => `export interface ${capitalize(componentName)}Schema {

}`;