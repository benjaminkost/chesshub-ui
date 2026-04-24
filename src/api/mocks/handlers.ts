import { http, HttpResponse } from 'msw';
import {allDummySimple, allUsers, dummyAllClubs} from './dummyData';
import { UserResponse, ClubSimple, UserSimple } from '@benaurel/chesshub-core-client';

export const handlers = [
    http.get('*/users/me', async () => {
        const currentUser: UserResponse = {
            id: allUsers[0].id,
            firstName: "Benjamin",
            lastName: "Kostka",
            userName: allUsers[0].userName,
            email: allUsers[0].email,
            appRole: 'SUPER_ADMIN' as any,
            clubIds: [1, 2],
            teamIds: [1]
        };
        return HttpResponse.json(currentUser);
    }),

    // Mock for getAllUsers
    http.get('*/users', async () => {
        const users: UserSimple[] = allUsers.map(u => ({
            id: u.id,
            name: u.name,
            userName: u.userName
        }));
        return HttpResponse.json(users);
    }),

    // Mock for getAllClubs
    http.get('*/clubs', async () => {
        const clubs: ClubSimple[] = dummyAllClubs.map(c => ({
            id: c.id,
            name: c.name,
            adminId: c.adminId
        }));
        return HttpResponse.json(clubs);
    }),

    // Mock for Login
    http.post('*/auth/login', async () => {
        return HttpResponse.json({
            id: 1,
            name: "Benjamin Kostka",
            userName: "b"
        });
    }),

    // Mock for Logout
    http.post('*/auth/logout', () => {
        return new HttpResponse(null, { status: 200 });
    }),

    // Mock for teams
    http.get("*/teams", () => {
        return HttpResponse.json(allDummySimple)
    })
];
