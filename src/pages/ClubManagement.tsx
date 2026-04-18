import React, { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import ClubManagementTable from "@/components/ClubManagementTable";
import { useParams } from "react-router-dom";
import { clubsApi } from "../../bff/src/clients/apiChesshubCore";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Club, TeamSimple } from "@benaurel/chesshub-core-client";

export default function ClubManagement() {
    const { clubId } = useParams<{ clubId: string }>();
    const [clubData, setClubData] = useState<(Club & { teams: TeamSimple[] }) | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!clubId) return;
            try {
                setLoading(true);
                // 1. Fetch club details and teams and users in parallel
                const [clubRes, teamsRes] = await Promise.all([
                    clubsApi.getClubById(Number(clubId)),
                    clubsApi.getTeamsByClub(Number(clubId)),
                ]);

                setClubData({
                    ...clubRes.data,
                    teams: teamsRes.data
                });
                setError(null);
            } catch (err: any) {
                console.error("Failed to fetch club management data:", err);
                setError("Daten konnten nicht geladen werden. Bitte versuche es später erneut.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [clubId]);

    if (loading) {
        return (
            <PageLayout>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress />
                </Box>
            </PageLayout>
        );
    }

    if (error || !clubData) {
        return (
            <PageLayout>
                <Box p={4} textAlign="center">
                    <Typography color="error">{error || "Verein nicht gefunden."}</Typography>
                </Box>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <ClubManagementTable club={clubData as any} />
        </PageLayout>
    );
}