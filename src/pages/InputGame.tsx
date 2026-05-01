import React, { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import { InputGameContent } from "@/components/InputGameContent";
import { usersApi} from "@/api/clients/apiChesshubCore";
import { Box, CircularProgress, Typography } from "@mui/material";
import { UserResponse } from "@benaurel/chesshub-core-client";

export function InputGame() {
    const [currentUser, setCurrentUser] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const userRes = await usersApi.getCurrentUser();
                setCurrentUser(userRes.data);
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
            <InputGameContent/>
        </PageLayout>
    );
}