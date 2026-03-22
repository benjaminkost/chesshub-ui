import React from "react";
import PageLayout from "@/components/PageLayout";
import HomeContent from "@/components/HomeContent";

export function Home() {

    return (
        <PageLayout loggedIn={false} children={<HomeContent/>} />
    )
}