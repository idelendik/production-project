import { Node, Project, SyntaxKind, ts } from 'ts-morph';

const removedFeatureName = process.argv[2]; // example: isArticleEnabled
const featureState = process.argv[3]; // example: on | off

if (!removedFeatureName) throw new Error('feature name is not specified');

if (!featureState) throw new Error('feature state is not specified');

if (featureState !== 'on' && featureState !== 'off')
    throw new Error("featureState is invalid. Should be 'on' or 'off'");

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

function isToggleFunction(node: Node<ts.Node>): boolean {
    let isToggleFeaturesFn = false;

    node.forEachChild((child) => {
        if (
            child.isKind(SyntaxKind.Identifier) &&
            child.getText() === 'toggleFeatures'
        ) {
            isToggleFeaturesFn = true;
        }
    });

    return isToggleFeaturesFn;
}

files.forEach((file) => {
    file.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            const objectOptions = node.getFirstDescendantByKind(
                SyntaxKind.ObjectLiteralExpression,
            );

            if (!objectOptions) return;

            const onFunctionProperty = objectOptions.getProperty('on');
            const offFunctionProperty = objectOptions.getProperty('off');

            const featureNameProperty = objectOptions.getProperty('name');

            const onFunction = onFunctionProperty?.getFirstDescendantByKind(
                SyntaxKind.ArrowFunction,
            );
            const offFunction = offFunctionProperty?.getFirstDescendantByKind(
                SyntaxKind.ArrowFunction,
            );
            const featureName = featureNameProperty
                ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
                ?.getText()
                .slice(1, -1);

            if (featureName !== removedFeatureName) return;

            if (featureState === 'on') {
                node.replaceWithText(onFunction?.getBody().getText() ?? '');
            }

            if (featureState === 'off') {
                node.replaceWithText(offFunction?.getBody().getText() ?? '');
            }
        }
    });
});

project.save();
