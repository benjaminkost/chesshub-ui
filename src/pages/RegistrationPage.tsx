import PageLayout from "@/components/PageLayout";
import {Registration} from "@/components/Registration";

export default function RegistrationPage(){
    return (
        <PageLayout loggedIn={false} children={<Registration />} />
    )
}