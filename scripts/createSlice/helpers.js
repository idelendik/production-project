const { join } = require("path");

module.exports = {
    capitalize: (str) => str.replace(str[0], str[0].toUpperCase()),
    decapitalize: (str) => str.replace(str[0], str[0].toLowerCase()),
    getRootPath: () => join(__dirname, "..", "..", "src")
}
