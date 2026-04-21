import React, { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { ProfileSettings } from "@/components/ProfileSettings";
import { useParams } from "react-router-dom";
import { usersApi } from "@/api/clients/apiChesshubCore";
import { Box, CircularProgress, Typography } from "@mui/material";
import { User } from "@benaurel/chesshub-core-client";

export function ProfileSettingsPage() {
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (!userId) return;
            try {
                setLoading(true);
                const res = await usersApi.getCurrentUser();
                setUser(res.data);
                setError(null);
            } catch (err: any) {
                console.error("Failed to fetch user profile:", err);
                setError("Profil konnte nicht geladen werden.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) {
        return (
            <PageLayout>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress />
                </Box>
            </PageLayout>
        );
    }

    if (error || !user) {
        return (
            <PageLayout>
                <Box p={4} textAlign="center">
                    <Typography color="error">{error || "Benutzer nicht gefunden."}</Typography>
                </Box>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <ProfileSettings user={user} />
        </PageLayout>
    );
}