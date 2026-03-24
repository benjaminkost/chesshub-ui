import PageLayout from "@/components/PageLayout";
import {ProfileSettings} from "@/components/ProfileSettings";
import {allUsers} from "@/dummyData";

export function ProfileSettingsPage(){
    return (
        <PageLayout loggedIn={true} children={<ProfileSettings user={allUsers[1]} />} />
    )
}