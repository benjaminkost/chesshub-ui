import {ClubSimpleVm} from "@/types/viewmodels/club.vm";
import {UserSimpleVm} from "@/types/viewmodels/user.vm";
import React from "react";

export interface LookupData {
    clubsSimple: Record<number, ClubSimpleVm>,
    usersSimple: Record<number, UserSimpleVm>
}

export const LookupContext = React.createContext<LookupData>( {
    clubsSimple: {},
    usersSimple: {}
});

export const useLookup = () => React.useContext(LookupContext);