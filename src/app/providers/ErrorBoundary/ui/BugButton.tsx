import { useEffect, useState } from "react";
import { t } from "i18next";

// This component is for testing purpose only!
export const BugButton = () => {
    const [error, setError] = useState(false);

    const throwError = () => {
        setError(true);
    }

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);

    return (
        <button onClick={throwError} >{t("Throw an error")}</button>
    );
};