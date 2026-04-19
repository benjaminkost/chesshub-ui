import React, { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import { InputGameContent } from "@/components/InputGameContent";
import { clubsApi, usersApi } from "@/api/clients/apiChesshubCore";
import { Box, CircularProgress, Typography } from "@mui/material";
import { TeamSimple, User } from "@benaurel/chesshub-core-client";

export function InputGame() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [allTeams, setAllTeams] = useState<TeamSimple[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // 1. Get current user
                const userRes = await usersApi.getCurrentUser();
                setCurrentUser(userRes.data);

                // 2. Fetch teams for the user's first club
                const clubId = userRes.data.clubIds?.[0];
                if (clubId) {
                    const teamsRes = await clubsApi.getTeamsByClub(clubId);
                    setAllTeams(teamsRes.data);
                }
                
                setError(null);
            } catch (err: any) {
                console.error("Failed to fetch input game data:", err);
                setError("Daten konnten nicht geladen werden.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <PageLayout>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress />
                </Box>
            </PageLayout>
        );
    }

    if (error || !currentUser) {
        return (
            <PageLayout>
                <Box p={4} textAlign="center">
                    <Typography color="error">{error || "Bitte logge dich ein."}</Typography>
                </Box>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <InputGameContent 
                allTeams={allTeams as any} 
                user={currentUser} 
            />
        </PageLayout>
    );
}