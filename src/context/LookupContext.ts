import {ClubSimpleVm} from "@/types/viewmodels/club.vm";
import {UserSimpleVm} from "@/types/viewmodels/user.vm";
import React from "react";

export interface LockupData {
    clubs: Record<number, ClubSimpleVm>,
    users: Record<number, UserSimpleVm>
}

export const LockupContext = React.createContext<LockupData>( {
    clubs: {},
    users: {}
});

export const useLockup = () => React.useContext(LockupContext);