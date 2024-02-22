const { capitalize } = require('../helpers');
module.exports = (componentName) => {
    const capitalizedName = capitalize(componentName);

    return `import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";

import cls from "./${capitalizedName}.module.scss";

interface ${capitalizedName}Props {
    className?: string;
}

export const ${capitalizedName} = memo((props: ${capitalizedName}Props) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.${capitalizedName}, {}, [className])}>

        </div>
    )
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
${capitalizedName}.displayName = "${capitalizedName}"`;
};
