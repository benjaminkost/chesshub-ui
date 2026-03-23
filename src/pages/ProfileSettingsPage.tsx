import PageLayout from "@/components/PageLayout";
import {ProfileSettings} from "@/components/ProfileSettings";

export function ProfileSettingsPage(){
    return (
        <PageLayout loggedIn={true} children={<ProfileSettings />} />
    )
}