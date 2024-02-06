import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page/Page";
import { RatingCard } from "@/entities/Rating";

const MainPage = () => {
    const { t } = useTranslation("main");

    return (
        <Page>
            {t("Main page")}
            <RatingCard hasFeedback title={"Your feedback"} feedBackTitle={"Title"} />
        </Page>
    );
};

export default MainPage;