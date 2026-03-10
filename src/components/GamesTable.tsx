import { Paper } from "@mui/material";
import React from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";

interface Row {
    id: number,
    whitePGN: string,
    blackPGN: string,
    datePGN: Date,
    opening: string,
    movePGN: string
}

interface Rows {
    rows: Row[]
}

export const defaultGamesTableData: Row[] = [
    {
        id: 1,
        whitePGN: "Filip Topov",
        blackPGN: "Lukas Zander",
        datePGN: new Date(13,11,2002),
        opening: "Scotch Opening",
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
        whitePGN: "Benjamin Moritz Aurelius Kostka",
        blackPGN: "Lukas Zander",
        datePGN: new Date(2002,10,13),
        opening: "Scotch Opening",
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

export function GamesTable({rows}: Rows ){

    const columns: GridColDef<(typeof rows)[number]>[] = [
        {
            field: "id",
            headerName: "ID",
            width: 30
        },
        {
            field: "whitePGN",
            headerName: "Weiß",
            width: 100
        },
        {
            field: "blackPGN",
            headerName: "Schwarz",
            width: 100
        },
        {
            field: "datePGN",
            headerName: "Datum",
            type: "date",
            width: 80
        },
        {
            field: "opening",
            headerName: "Eröffnung",
            width: 120
        },
        {
            field: "movePGN",
            headerName: "Züge",
            width: 900
        }
    ];

    return(
        <>
            <Paper
                sx={{
                    mt: 3,
                    mr: 3,
                    mb: 3,
                    ml: 3,
                    maxWidth: "100%",
                    overflow: "hidden"
            }}
            >
                <DataGrid
                    columns={columns}
                    rows={rows}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        }
                    }}
                    pageSizeOptions={[1,5,10,25,100]}
                />
            </Paper>
        </>
    )
}