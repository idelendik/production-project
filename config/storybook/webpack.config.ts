import webpack, { RuleSetRule } from "webpack";
import { BuildPaths } from "../build/types/config";
import path from "path";
import { buildCssLoaders } from "../build/loaders/buildCssLoaders";

export default ({ config }: {config: webpack.Configuration}) => {
    const paths: BuildPaths = {
        build: "",
        html: "",
        entry: "",
        src: path.resolve(__dirname, "..", "..", "src"),
        locales: "",
        buildLocales: "",
    }

    config!.resolve!.modules!.push(paths.src);
    config!.resolve!.extensions!.push(".ts", ".tsx");
    config!.resolve!.alias = {
        ...config!.resolve!.alias,
        "@": paths.src
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config!.module!.rules = config!.module!.rules!.map((rule: RuleSetRule) => {
        if(/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
    });

    config!.module!.rules.push({
        test: /\.svg$/i,
        use: ["@svgr/webpack"],
    });

    config!.module!.rules.push({
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: "file-loader",
            },
        ],
    });

    config!.module!.rules.push(buildCssLoaders(true));

    config!.plugins!.push(new webpack.DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify("https://testapi.ru"),
        __PROJECT__: JSON.stringify("storybook"),
    }))

    return config;
}

