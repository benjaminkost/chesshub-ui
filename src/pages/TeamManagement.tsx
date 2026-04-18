import React, { useEffect, useState } from "react";
import TeamManagementTable from "@/components/TeamManagementTable";
import PageLayout from "@/components/PageLayout";
import { useParams } from "react-router-dom";
import { clubsApi, teamsApi } from "../../bff/src/clients/apiChesshubCore";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Team, TeamMember } from "@benaurel/chesshub-core-client";

export default function TeamManagement() {
    const { teamId } = useParams<{ teamId: string }>();
    const [team, setTeam] = useState<Team | null>(null);
    const [allPotentialMembers, setAllPotentialMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!teamId) return;
            try {
                setLoading(true);
                const teamRes = await teamsApi.getTeamById(Number(teamId));
                const currentTeam = teamRes.data;
                setTeam(currentTeam);

                if (currentTeam.clubId) {
                    const membersRes = await clubsApi.getClubMembers(currentTeam.clubId);
                    setAllPotentialMembers(membersRes.data.map(m => ({
                        id: m.userId,
                        name: `${m.firstName} ${m.lastName}`,
                        roles: []
                    } as TeamMember)));
                }

                setError(null);
            } catch (err: any) {
                console.error("Failed to fetch team management data:", err);
                setError("Mannschaftsdaten konnten nicht geladen werden.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [teamId]);

    if (loading) {
        return (
            <PageLayout>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress />
                </Box>
            </PageLayout>
        );
    }

    if (error || !team) {
        return (
            <PageLayout>
                <Box p={4} textAlign="center">
                    <Typography color="error">{error || "Mannschaft nicht gefunden."}</Typography>
                </Box>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <TeamManagementTable
                team={team}
                allUsers={allPotentialMembers}
            />
        </PageLayout>
    );
}