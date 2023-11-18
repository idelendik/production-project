const { argv } = require("process");
const { mkdirSync, writeFileSync } = require("fs");
const { join, } = require("path");

const { getRootPath, capitalize, decapitalize } = require("./helpers");

const indexContent = require("./templates/index");
const styleContent = require("./templates/style");
const schemaContent = require("./templates/schema");
const sliceContent = require("./templates/slice");
const storiesContent = require("./templates/stories");
const componentContent = require("./templates/component");

const layers = [
    "pages",
    "entities",
    "features",
];

(function createSlice() {
    if (argv.length === 2) throw new Error("Layer and Slice are missing. Usage: node ./scripts/createSlice [layer] [slice]");

    if (argv.length < 4) throw new Error("Either Layer or Slice is missing. Usage: node ./scripts/createSlice [layer] [slice]");

    const layer = argv[2].toLowerCase();
    if (!layers.includes(layer)) throw new Error(`Incorrect layer. Available layers: [${layers.toString()}]`)

    const slice = decapitalize(argv[3]);
    const capitalisedSlice = capitalize(slice);

    const rootPath = join(getRootPath(), layer, slice);
    const uiPath = join(rootPath, "ui");
    const uiComponentPath = join(uiPath, capitalisedSlice);
    const modelPath = join(rootPath, "model");
    const slicesPath = join(modelPath, "slices");
    const typesPath = join(modelPath, "types");
    const selectorsPath = join(modelPath, "selectors");
    const servicesPath = join(modelPath, "services");

    const pathsData = new Map([
        [rootPath],
        [join(rootPath, "index.ts"), indexContent(slice)],
        [uiPath],
        [uiComponentPath],
        [join(uiComponentPath, `${capitalisedSlice}.tsx`), componentContent(slice)],
        [join(uiComponentPath, `${capitalisedSlice}.stories.tsx`), storiesContent(layer, slice)],
        [join(uiComponentPath, `${capitalisedSlice}.module.scss`), styleContent(slice)],
        [modelPath],
        [selectorsPath],
        [servicesPath],
        [slicesPath],
        [join(slicesPath,`${slice}Slice.tsx`), sliceContent(slice)],
        [typesPath],
        [join(typesPath, `${slice}Schema.tsx`), schemaContent(slice)],
    ]);

    for( const [path, template] of pathsData.entries() ) {
        if(template) {
            writeFileSync(path, template);
        } else {
            mkdirSync(path);
        }
    }
})();