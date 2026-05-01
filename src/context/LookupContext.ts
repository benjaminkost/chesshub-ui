import {ClubSimpleVm} from "@/types/viewmodels/club.vm";
import {UserSimpleVm} from "@/types/viewmodels/user.vm";
import React from "react";
import {TeamSimpleVm} from "@/types/viewmodels/team.vm";

export interface LookupData {
    clubsSimple: Record<number, ClubSimpleVm>,
    teamsSimple: Record<number, TeamSimpleVm>,
    usersSimple: Record<number, UserSimpleVm>
}

export const LookupContext = React.createContext<LookupData>( {
    clubsSimple: {},
    teamsSimple: {},
    usersSimple: {}
});

export const useLookup = () => React.useContext(LookupContext);