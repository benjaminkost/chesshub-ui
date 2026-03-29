import PageLayout from "@/components/PageLayout";
import {BugReportContent} from "@/components/BugReportContent";

export function BugReport() {
    return (
        <PageLayout loggedIn={false} children={< BugReportContent />}/>
    )
}