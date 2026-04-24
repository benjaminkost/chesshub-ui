
export interface TeamModel {
    id: number;
    clubId: number;
    name: string;
    memberIds?: number[];
    adminId?: number;
}