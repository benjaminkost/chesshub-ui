import {Club, ClubAffiliation, ClubTeams, MemberStatus} from "./types/club.js";
import {Row} from "./components/GamesTable.js";
import {Team} from "./types/team.js";
import {Member, MemberRole, User} from "@/types/user";

export const allUsers: User[] = [
    {id: 1, name: "Benjamin Kostka", userName: "b", email: "a", fideID: "123456789", lichessUsername: "benboomer01", chesscomUsername: "benboomer02"},
    {id: 2, name: "Lukas Zander", userName: "b", email: "a"},
    {id: 3, name: "Filip Topic", userName: "b", email: "a"},
    {id: 4, name: "Sebastian Kostka", userName: "b", email: "a"},
    {id: 5, name: "Kurt Zander", userName: "b", email: "a"},
    {id: 6, name: "Ursula Topic", userName: "b", email: "a"}
];

export const dummyAllClubs: Club[] = [
    {id: 1, name: "SV Empor", address: "Straße 1", admin: allUsers[0]},
    {id: 2, name: "SV Brauereien", address: "Straße 2", admin: allUsers[1]},
    {id: 3, name: "Bayern München", address: "Straße 3", admin: allUsers[2]},
    {id: 4, name: "Bayern München 2", address: "Straße 4", admin: allUsers[3]},
    {id: 5, name: "Bayern München 3", address: "Straße 5", admin: allUsers[4]},
    {id: 6, name: "Bayern München 4", address: "Straße 6", admin: allUsers[5]},
    {id: 7, name: "Bayern München 5", address: "Straße 7", admin: allUsers[6]}
];

export const dummyClubAffiliation: ClubAffiliation[] = [
    {id: 1, name: "SV Empor", address: "Straße 1", admin: allUsers[0], status: MemberStatus.MEMBER},
    {id: 2, name: "SV Brauereien", address: "Straße 2", admin: allUsers[1], status: MemberStatus.APPLICANT},
    {id: 3, name: "Bayern München", address: "Straße 3", admin: allUsers[2], status: MemberStatus.FORMER_MEMBER}
];

export const dummyPgn = "[Event \"?\"]\n" +
    "[Site \"?\"]\n" +
    "[Date \"????.??.??\"]\n" +
    "[Round \"?\"]\n" +
    "[White \"?\"]\n" +
    "[Black \"?\"]\n" +
    "[Result \"*\"]\n\n" +
    "1. d4 d5 2. c4 e6 3. e3 Nf6 4. Nf3 c5 5. dxc5 Bxc5 6. Nc3 O-O 7. cxd5 Bb4 8. a3 Bxc3+ 9. bxc3 exd5 10. Be2 Qc7 11. " +
    "Bb2 Rd8 12. O-O b6 13. Rc1 Bb7 14. Qc2 Na6 15. c4 Qe7 16. Nd4 Nc5 17. Nf5 Qe4 18. Bxf6 Qxc2 19. Rxc2 gxf6 20. cxd5 " +
    "Bxd5 21. Ne7+ Kf8 22. Nxd5 Rxd5 23. Bf3 Rad8 24. Bxd5 Rxd5 25. g3 Nb3 26. Rc8+ Kg7 27. Rc7 Nd2 28. Rb1 Nxb1 29. " +
    "Rxa7 b5 30. a4 bxa4 31. Rxa4 Nc3 32. Ra1 Rd2 33. Rf1 Kg6 34. Kg2 Nd5 35. Rc1 Nxe3+ 36. Kf3 Nd1 37. h4 Rxf2+ " +
    "38. Ke4 Rd2 39. Kf3 Nb2 40. Ke3 Rd5 41. g4 f5 42. Rc6+ Kg7 43. g5 Rd3+ 44. Kf4 Rd4+ 45. Kg3 Rg4+ 46. Kh3 Nc4 " +
    "47. Rc5 Kg6 48. Rc6+ Kg7 49. Rf6 Ne3 50. Rxf5 Rxh4+ 51. Kxh4 Nxf5+ 52. Kg4 Kg6 53. Kf4 h6 54. gxh6 Nxh6 " +
    "55. Ke5 Kg5 56. Ke4 f6 57. Kf3 Kf5 58. Kg3 Ke4 59. Kf2 f5 60. Kg3 Ke3 61. Kh4 f4 62. Kg5 Nf7+ 63. Kf6 Nd6 " +
    "64. Ke5 Ne4 65. Kf5 f3 66. Kg4 f2 67. Kf5 f1=Q+ *";

export const dummyGamesTableData: Row[] = [
    {
        id: 1,
        whitePGN: "Filip Topov",
        blackPGN: "Lukas Zander",
        datePGN: new Date(13,11,2002),
        opening: "Scotch Opening",
        team: "SV Empor",
        movePGN: "1. e4 c6 2. d4 d5 3. " +
            "exd5 cxd5 4. Nc3 Nc6 5. Bb5 Nf6 6. Nge2 " +
            "Bg4 7. O-O e6 8. f3 Bf5 9. a3 a6 10. Ba4 b5 11. " +
            "Bb3 Be7 12. Ng3 Bg6 13. f4 Qb6 14. Nce2 Nh5 15. c3 " +
            "O-O 16. f5 Nxg3 17. Nxg3 exf5 18. Nxf5 Rad8 19. Nxe7+ " +
            "Nxe7 20. Bg5 f6 21. Bd2 Rfe8 22. Qg4 f5 23. Qg5 a5 24. " +
            "Bc2 h6 25. Qh4 f4 26. Bxg6 Nxg6 27. Qg4 Re4 28. Bxf4 " +
            "Rf8 29. Bc7 Rxf1+ 30. Kxf1 Qf6+ 31. Qf3 Qxf3+ 32. gxf3 " +
            "Re3 33. Kf2 Re7 34. Bxa5 Nf4 35. Kg3 Nh5+ 36. Kf2 Nf4 " +
            "37. Kg3 Nh5+ 38. Kh4 Nf4 39. a4 bxa4 40. Rxa4 g5+ " +
            "41. Kg4 Ng2 42. Kg3 Ne3 43. b4 h5 44. Ra2 h4+ 45. Kf2 Nd1+ " +
            "46. Kg2 Nxc3 47. Rc2 Nb5 48. Bb6 Re3 49. Rd2 Rb3 50. Bc5 Na3 " +
            "51. Re2 Nc4 52. Be7 Ne3+ 53. Kf2 Nd1+ 54. Ke1 Rb1 55. Kd2 Nb2 " +
            "56. Kc2 Rd1 57. Bc5 Rf1 58. Kxb2 Rxf3 59. Rg2 Rf5 60. b5 Kh7 " +
            "61. b6 Rf7 62. Rxg5 Kh6 63. Rg2 Kh5 64. Kc3 h3 65. Re2 Kg4 " +
            "66. Bd6 Rb7 67. Rb2 Kf3 68. Kd3 Kg4 69. Ke3 Kf5 70. Bc7 Ke6 " +
            "71. Ra2 Kd7 72. Ra7 Kc6 73. Rxb7 Kxb7 74. Kf4 Ka8 75. Ke5 Kb7 " +
            "76. Kxd5 Ka6 77. Ke6 Kb7 78. d5 Kc8 79. d6 Kb7 80. d7 Kc6 " +
            "81. d8=Q Kb7 82. Qd3 Ka8 83. Qa6# 1-0"},
    {
        id: 2,
        whitePGN: "Benjamin Kostka",
        blackPGN: "Lukas Zander",
        datePGN: new Date(2002,10,13),
        opening: "Scotch Opening",
        team: "SV Kreuzberg",
        movePGN: "1. e4 c6 2. d4 d5 3. " +
            "exd5 cxd5 4. Nc3 Nc6 5. Bb5 Nf6 6. Nge2 " +
            "Bg4 7. O-O e6 8. f3 Bf5 9. a3 a6 10. Ba4 b5 11. " +
            "Bb3 Be7 12. Ng3 Bg6 13. f4 Qb6 14. Nce2 Nh5 15. c3 " +
            "O-O 16. f5 Nxg3 17. Nxg3 exf5 18. Nxf5 Rad8 19. Nxe7+ " +
            "Nxe7 20. Bg5 f6 21. Bd2 Rfe8 22. Qg4 f5 23. Qg5 a5 24. " +
            "Bc2 h6 25. Qh4 f4 26. Bxg6 Nxg6 27. Qg4 Re4 28. Bxf4 " +
            "Rf8 29. Bc7 Rxf1+ 30. Kxf1 Qf6+ 31. Qf3 Qxf3+ 32. gxf3 " +
            "Re3 33. Kf2 Re7 34. Bxa5 Nf4 35. Kg3 Nh5+ 36. Kf2 Nf4 " +
            "37. Kg3 Nh5+ 38. Kh4 Nf4 39. a4 bxa4 40. Rxa4 g5+ " +
            "41. Kg4 Ng2 42. Kg3 Ne3 43. b4 h5 44. Ra2 h4+ 45. Kf2 Nd1+ " +
            "46. Kg2 Nxc3 47. Rc2 Nb5 48. Bb6 Re3 49. Rd2 Rb3 50. Bc5 Na3 " +
            "51. Re2 Nc4 52. Be7 Ne3+ 53. Kf2 Nd1+ 54. Ke1 Rb1 55. Kd2 Nb2 " +
            "56. Kc2 Rd1 57. Bc5 Rf1 58. Kxb2 Rxf3 59. Rg2 Rf5 60. b5 Kh7 " +
            "61. b6 Rf7 62. Rxg5 Kh6 63. Rg2 Kh5 64. Kc3 h3 65. Re2 Kg4 " +
            "66. Bd6 Rb7 67. Rb2 Kf3 68. Kd3 Kg4 69. Ke3 Kf5 70. Bc7 Ke6 " +
            "71. Ra2 Kd7 72. Ra7 Kc6 73. Rxb7 Kxb7 74. Kf4 Ka8 75. Ke5 Kb7 " +
            "76. Kxd5 Ka6 77. Ke6 Kb7 78. d5 Kc8 79. d6 Kb7 80. d7 Kc6 " +
            "81. d8=Q Kb7 82. Qd3 Ka8 83. Qa6# 1-0"}
];

export const allMembers: Member[] = [
    {id: 1, name: "Benjamin Kostka", roles: [MemberRole.PLAYER, MemberRole.ADMIN]},
    {id: 2, name: "Lukas Zander", roles: [MemberRole.PLAYER, MemberRole.HEAD_COACH]},
    {id: 3, name: "Filip Topic", roles: [MemberRole.PLAYER, MemberRole.CAPTAIN]},
    {id: 4, name: "Sebastian Kostka", roles: []},
    {id: 5, name: "Kurt Zander", roles: []},
    {id: 6, name: "Ursula Topic", roles: []},
];

export const teamMembersOfDummyTeam: Member[] = [
    {id: 1, name: "Benjamin Kostka", roles: [MemberRole.PLAYER, MemberRole.ADMIN]},
    {id: 2, name: "Lukas Zander", roles: [MemberRole.PLAYER, MemberRole.HEAD_COACH]},
    {id: 3, name: "Filip Topic", roles: [MemberRole.PLAYER, MemberRole.CAPTAIN]},
];

export const dummyTeam: Team = {
    id: 1,
    club: {id: 1, name: "Dummy Club", address: "Straße 1", admin: allUsers[0]},
    name: "Mannschaft 1",
    members: teamMembersOfDummyTeam,
    admin: {id: 1, name: "Benjamin Kostka", userName: "bkostka", email: "mail@ben-kostka.de"}
}

export const dummyClubTeams: ClubTeams = {
    id: 1,
    name: "1. Mannschaft",
    admin: allUsers[0],
    teams: [dummyTeam],
    address: "Choriner Straße 1"
}

export const allDummyTeams: Team[] = [
    {id: 1, name: "1. Mannschaft", club: dummyAllClubs[0], admin: allUsers[0], members: allMembers},
    {id: 2, name: "2. Mannschaft", club: dummyAllClubs[0], admin: allUsers[0], members: allMembers},
    {id: 3, name: "3. Mannschaft", club: dummyAllClubs[0], admin: allUsers[0], members: allMembers},
    {id: 4, name: "4. Mannschaft", club: dummyAllClubs[0], admin: allUsers[0], members: allMembers},
    {id: 5, name: "1. Mannschaft", club: dummyAllClubs[1], admin: allUsers[1], members: allMembers},
    {id: 6, name: "2. Mannschaft", club: dummyAllClubs[1], admin: allUsers[1], members: allMembers},
    {id: 7, name: "3. Mannschaft", club: dummyAllClubs[1], admin: allUsers[1], members: allMembers},
    {id: 8, name: "4. Mannschaft", club: dummyAllClubs[1], admin: allUsers[1], members: allMembers},
    {id: 9, name: "1. Mannschaft", club: dummyAllClubs[2], admin: allUsers[2], members: allMembers},
    {id: 10, name: "2. Mannschaft", club: dummyAllClubs[2], admin: allUsers[2], members: allMembers},
    {id: 11, name: "3. Mannschaft", club: dummyAllClubs[2], admin: allUsers[2], members: allMembers},
    {id: 12, name: "4. Mannschaft", club: dummyAllClubs[2], admin: allUsers[2], members: allMembers},
    {id: 13, name: "1. Mannschaft", club: dummyAllClubs[3], admin: allUsers[3], members: allMembers},
    {id: 14, name: "2. Mannschaft", club: dummyAllClubs[3], admin: allUsers[3], members: allMembers},
    {id: 15, name: "3. Mannschaft", club: dummyAllClubs[3], admin: allUsers[3], members: allMembers},
    {id: 16, name: "4. Mannschaft", club: dummyAllClubs[3], admin: allUsers[3], members: allMembers},
    {id: 13, name: "1. Mannschaft", club: dummyAllClubs[4], admin: allUsers[3], members: allMembers},
    {id: 14, name: "2. Mannschaft", club: dummyAllClubs[4], admin: allUsers[3], members: allMembers},
    {id: 15, name: "3. Mannschaft", club: dummyAllClubs[4], admin: allUsers[3], members: allMembers},
    {id: 16, name: "4. Mannschaft", club: dummyAllClubs[4], admin: allUsers[3], members: allMembers},
    {id: 17, name: "1. Mannschaft", club: dummyAllClubs[5], admin: allUsers[3], members: allMembers},
    {id: 18, name: "2. Mannschaft", club: dummyAllClubs[5], admin: allUsers[3], members: allMembers},
    {id: 19, name: "3. Mannschaft", club: dummyAllClubs[5], admin: allUsers[3], members: allMembers},
    {id: 20, name: "4. Mannschaft", club: dummyAllClubs[5], admin: allUsers[3], members: allMembers},
    {id: 21, name: "1. Mannschaft", club: dummyAllClubs[6], admin: allUsers[3], members: allMembers},
    {id: 22, name: "2. Mannschaft", club: dummyAllClubs[6], admin: allUsers[3], members: allMembers},
    {id: 23, name: "3. Mannschaft", club: dummyAllClubs[6], admin: allUsers[3], members: allMembers},
    {id: 24, name: "4. Mannschaft", club: dummyAllClubs[6], admin: allUsers[3], members: allMembers}
];

export const dummyDate = new Date();

export const dummyEvent = "FIDE Weltmeisterschaft";

export const dummyRound = 10;