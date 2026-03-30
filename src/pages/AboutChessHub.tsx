import PageLayout from "@/components/PageLayout";
import {AboutChessHubContent} from "@/components/AboutChessHubContent";

export function AboutChessHub() {
    return (
        <PageLayout loggedIn={false} children={< AboutChessHubContent />} />
    )
}