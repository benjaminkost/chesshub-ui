import PageLayout from "@/components/PageLayout";
import {RequestNewPassword} from "@/components/RequestNewPassword";

export function RequestNewPasswordPage() {
    return (
        <PageLayout loggedIn={false} children={<RequestNewPassword />}/>
    );
}