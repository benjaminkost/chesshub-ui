import { Login } from "@/components/Login";
import PageLayout from "../components/PageLayout";

export default function LoginPage(){
    return (
        <PageLayout loggedIn={false}
                    children={< Login />}
        />
    )
}