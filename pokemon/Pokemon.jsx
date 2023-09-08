import React from "react";
import TopBar from "./TopBar";
import PokeList from "./PokeList";
import BottomBar from "./BottomBar";


function Pokemon() {
  console.log("pokemon!");

  return (
    <React.Fragment>
      <TopBar />
      <PokeList />
      <BottomBar />
    </React.Fragment>
  );
}
export default Pokemon;
