import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildCssLoaders (isDev: boolean) {
    return {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings.
            // IMPORTANT - style-loader works incorrect and changes <style> tags order on reload.
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            // MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            {
                loader: "css-loader",
                options: {
                    modules: {
                        auto: (resPath: string) => Boolean(resPath.includes(".module.")),
                        localIdentName: isDev ? "[path][name]__[local]--[hash:base64:5]" : "[hash:base64:8]",
                    },
                },
            },
            // Compiles Sass to CSS
            "sass-loader",
        ]
    }
}