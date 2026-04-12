import React, { useEffect, useState } from "react";
import ClubsTable from "@/components/ClubsTable";
import PageLayout from "@/components/PageLayout";
import { useParams } from "react-router-dom";
import { clubsApi, usersApi } from "@/api/chesshub";
import { Box, CircularProgress, Typography } from "@mui/material";
import { ClubAffiliation, ClubSimple } from "@benaurel/chesshub-core-client";

export default function ClubAffiliationPage() {
    const { userId } = useParams<{ userId: string }>();
    const [allClubs, setAllClubs] = useState<ClubSimple[]>([]);
    const [myClubs, setMyClubs] = useState<ClubAffiliation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClubs = async () => {
            if (!userId) return;
            try {
                setLoading(true);
                // Fetch user-specific clubs if userId matches, or fetch for the given userId
                const [allRes, myRes] = await Promise.all([
                    clubsApi.getAllClubs(),
                    usersApi.getClubsByUser(Number(userId)) // Note: Ensure getClubsByUser exists or use similar
                ]);
                setAllClubs(allRes.data);
                setMyClubs(myRes.data);
                setError(null);
            } catch (err: any) {
                console.error("Failed to fetch club affiliation data:", err);
                setError("Daten konnten nicht geladen werden.");
            } finally {
                setLoading(false);
            }
        };

        fetchClubs();
    }, [userId]);

    if (loading) {
        return (
            <PageLayout loggedIn={true}>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress />
                </Box>
            </PageLayout>
        );
    }

    if (error) {
        return (
            <PageLayout loggedIn={true}>
                <Box p={4} textAlign="center">
                    <Typography color="error">{error}</Typography>
                </Box>
            </PageLayout>
        );
    }

    return (
        <PageLayout loggedIn={true}>
            <ClubsTable allClubs={allClubs} clubsOfUser={myClubs} />
        </PageLayout>
    );
}