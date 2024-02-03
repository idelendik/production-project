import { RuleSetRule } from "webpack";
import { BuildOptions } from "./types/config";
import { buildCssLoaders } from "./loaders/buildCssLoaders";
import { buildBabelLoader } from "./loaders/buildBabelLoader";

export function buildLoaders(options: BuildOptions): RuleSetRule[] {
    const { isDev } = options;
    const svgLoader = {
        test: /\.svg$/i,
        use: ["@svgr/webpack"],
    };

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: "file-loader",
            },
        ],
    };

    const cssLoader = buildCssLoaders(isDev);

    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    return [
        codeBabelLoader,
        tsxCodeBabelLoader,
        cssLoader,
        svgLoader,
        fileLoader,
    ];
}