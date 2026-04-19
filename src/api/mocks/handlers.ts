import { http, HttpResponse } from 'msw';
import { allUsers, dummyAllClubs } from './dummyData';
import { User, ClubSimple, UserSimple } from '@benaurel/chesshub-core-client';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const handlers = [
    // Mock for getCurrentUser
    http.get('*/users/me', async () => {
        await delay(300);
        // Map dummy user to the generated User type
        const currentUser: User = {
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
];
