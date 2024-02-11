import { Project } from "ts-morph";
import path from "path";

const project = new Project({});

project.addSourceFilesAtPaths("src/**/*.ts");
project.addSourceFilesAtPaths("src/**/*.tsx");

const files = project.getSourceFiles();
const uiPath = path.resolve(__dirname, "..", "..", "src", "shared", "ui")
const sharedUiDirectory = project.getDirectory(uiPath);
const componentsDirs = sharedUiDirectory?.getDirectories();

componentsDirs?.forEach(componentDir => {
    const indexFilePath = `${componentDir.getPath()}/index.ts`;
    const indexFile = componentDir.getSourceFile(indexFilePath);

    if (indexFile) {
        return;
    }

    const sourceCode = `export * from "./${componentDir.getBaseName()}";`;
    componentDir.createSourceFile(indexFilePath, sourceCode);

    project.save();
});

function isAbsolute(value: string): boolean {
    const layers = ["app", "shared", "entities", "features", "widgets", "pages"];

    return layers.some(( layer) => value.startsWith(layer));
}

files.forEach((file) => {
    const importDeclarations = file.getImportDeclarations();

    importDeclarations.forEach((declaration) => {
        const value = declaration.getModuleSpecifierValue();
        const valueWithoutAlias = value.replace("@/", "");
        const segments = valueWithoutAlias.split("/");

        const isSharedLayer = segments?.[0] === "shared";
        const isUiSlice = segments?.[1] === "ui";

        if(isAbsolute(valueWithoutAlias) && isSharedLayer && isUiSlice) {
            const result = valueWithoutAlias.split("/").slice(0, 3).join("/");
            declaration.setModuleSpecifier(`@/${result}`)
        }
    })
})

project.save();