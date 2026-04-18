import React, { useEffect, useState } from "react";
import { GamesTable } from "@/components/GamesTable";
import PageLayout from "@/components/PageLayout";
import { useParams } from "react-router-dom";
import { gamesApi } from "../../bff/src/clients/apiChesshubCore";
import { Box, CircularProgress, Typography } from "@mui/material";
import { GameVm } from "@/types/viewmodels/game.vm";
import { mapGameToVm } from "../../bff/src/mapper/mapper";

export default function ClubsGamesHistory() {
    const { clubId } = useParams<{ clubId: string }>();
    const [games, setGames] = useState<GameVm[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGames = async () => {
            if (!clubId) return;
            try {
                setLoading(true);
                const gamesRes = await gamesApi.getGamesByClub(Number(clubId));
                setGames(gamesRes.data.map(mapGameToVm));
                setError(null);
            } catch (err: any) {
                console.error("Failed to fetch games for club:", err);
                setError("Spiele konnten nicht geladen werden.");
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
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

    if (error) {
        return (
            <PageLayout>
                <Box p={4} textAlign="center">
                    <Typography color="error">{error}</Typography>
                </Box>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <GamesTable
                rows={games}
                ownGamesOrTeamGames={false}
            />
        </PageLayout>
    );
}