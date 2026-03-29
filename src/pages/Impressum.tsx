import PageLayout from "@/components/PageLayout";
import {ImpressumContent} from "@/components/ImpressumContent";

export function Impressum() {
    return (
        <PageLayout loggedIn={false} children={< ImpressumContent />} />
    )
}