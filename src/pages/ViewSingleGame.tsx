import React, { useEffect, useState } from "react";
import { ChessBoardEditor } from "@/components/ChessBoardEditor";
import PageLayout from "@/components/PageLayout";
import { useParams } from "react-router-dom";
import { gamesApi, usersApi } from "@/api/chesshub";
import { Box, CircularProgress, Typography } from "@mui/material";
import { GameVm } from "@/types/viewmodels/game.vm";
import { UserVm } from "@/types/viewmodels/user.vm";
import { mapGameToVm, mapUserToVm } from "@/utils/mapper";

export default function ViewSingleGame() {
    const { gameId } = useParams<{ gameId: string }>();
    const [game, setGame] = useState<GameVm | null>(null);
    const [currentUser, setCurrentUser] = useState<UserVm | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!gameId) return;
            try {
                setLoading(true);
                const [gameRes, userRes] = await Promise.all([
                    gamesApi.getGameById(Number(gameId)),
                    usersApi.getCurrentUser()
                ]);
                
                setGame(mapGameToVm(gameRes.data));
                setCurrentUser(mapUserToVm(userRes.data));
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

    if (error || !game || !currentUser) {
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
                allTeams={[]} // Could be fetched if needed for editing
                user={currentUser as any} // UserVm vs User client mismatch, might need deeper mapping
                initialWhitePlayer={game.whitePlayerName}
                initialBlackPlayer={game.blackPlayerName}
                initialDate={game.date}
                initialEvent={game.event}
                initialRound={game.round}
                initialMoves={game.moves} 
            />
        </PageLayout>
    );
}