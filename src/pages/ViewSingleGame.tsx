import React, { useEffect, useState } from "react";
import { ChessBoardEditor } from "@/components/ChessBoardEditor";
import PageLayout from "@/components/PageLayout";
import { useParams } from "react-router-dom";
import { gamesApi } from "@/api/clients/apiChesshubCore";
import { Box, CircularProgress, Typography } from "@mui/material";
import { GameVm } from "@/types/viewmodels/game.vm";
import { mapGameToVm } from "@/api/mappers/mapper";

export default function ViewSingleGame() {
    const { gameId } = useParams<{ gameId: string }>();
    const [game, setGame] = useState<GameVm | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!gameId) return;
            try {
                setLoading(true);
                const gameRes = await gamesApi.getGameById(Number(gameId));
                setGame(mapGameToVm(gameRes.data));
                setError(null);
            } catch (err: any) {
                console.error("Failed to fetch game details:", err);
                setError("Partie konnte nicht geladen werden.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [gameId]);

    if (loading) {
        return (
            <PageLayout>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress />
                </Box>
            </PageLayout>
        );
    }

    if (error || !game) {
        return (
            <PageLayout>
                <Box p={4} textAlign="center">
                    <Typography color="error">{error || "Partie nicht gefunden."}</Typography>
                </Box>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <ChessBoardEditor 
                allTeams={[]}
                initialMetaData={{
                    whitePlayerId: game.whitePlayerId,
                    whitePlayerName: game.whitePlayerName,
                    blackPlayerId: game.blackPlayerId,
                    blackPlayerName: game.blackPlayerName,
                    date: game.date,
                    event: game.event,
                    round: game.round,
                }}
                initialMoves={game.moves} 
            />
        </PageLayout>
    );
}