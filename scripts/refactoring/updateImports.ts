import { Project } from "ts-morph";

const project = new Project({});

project.addSourceFilesAtPaths("src/**/*.ts");
project.addSourceFilesAtPaths("src/**/*.tsx");

const files = project.getSourceFiles();

function isAbsolute(value: string): boolean {
    const layers = ["app", "shared", "entities", "features", "widgets", "pages"];

    return layers.some(( layer) => value.startsWith(layer));
}

files.forEach((file) => {
    const importDeclarations = file.getImportDeclarations();

    importDeclarations.forEach((declaration) => {
        const value = declaration.getModuleSpecifierValue();

        if(isAbsolute(value)) {
            declaration.setModuleSpecifier(`@/${value}`)
        }
    })
})

project.save();