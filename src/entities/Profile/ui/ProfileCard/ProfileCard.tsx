import { classNames } from "shared/lib/classNames/classNames";

import cls from "./ProfileCard.module.scss"
import { useSelector } from "react-redux";
import { getProfileData } from "entities/Profile/model/selectors/getProfileData/getProfileData";
// import { getProfileIsLoading } from "entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading";
// import { getProfileError } from "entities/Profile/model/selectors/getProfileError/getProfileError";
import { useTranslation } from "react-i18next";
import { Text } from "shared/ui/Text/Text";
import { Button } from "shared/ui/Button";
import { ButtonTheme } from "shared/ui/Button/ui/Button";
import { Input } from "shared/ui/Input";

interface ProfileCardProps {
    className?: string
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
    const { t } = useTranslation("profileCard");

    const data = useSelector(getProfileData);
    // const isLoading = useSelector(getProfileIsLoading);
    // const error = useSelector(getProfileError);

    return (
        <div className={classNames(cls.ProfileCard,{}, [className])}>
            <div className={cls.header}>
                <Text title={t("profile")} />
                <Button className={cls.editBtn} theme={ButtonTheme.OUTLINE}>{t("edit")}</Button>
            </div>
            <div className={cls.data}>
                <Input
                    value={data?.firstname}
                    placeholder={t("your_firstname")}
                    className={cls.input}
                    onChange={() => {}}
                />
                <Input
                    value={data?.lastname}
                    placeholder={t("your_lastname")}
                    className={cls.input}
                    onChange={() => {}}
                />
            </div>
        </div>
    );
};