import {Link} from "react-router-dom";

export function Header() {
    return (
        <>
            <button id={"menuButton"}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div id={"homePageButton"}>
                <img src={"src/assets/images/black_pawn.png"} alt={"Black Pawn"}/>
                <h1>ChessHub</h1>
            </div>
            <br/>
            <br/>

        </>
    )
}