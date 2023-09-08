import React from "react";
import "./topbar.css";

function TopBar() {
  return (
    <React.Fragment>
      <div className="pokedex-title">
        <div className="left-title">
          <p>Pokedex</p>
        </div>
        <div className="caught-seen">
          <div className="caught">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png"
              alt="pokeball"
              style={{ width: "40px", marginRight: "10px" }}
            />
            <p>438</p>
          </div>
          <div className="seen">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png"
              alt="pokeball"
              style={{ width: "40px", marginRight: "10px" }}
            />
            <p>1281</p>
          </div>
        </div>
        <p style={{color: "white"}}>A -&gt; Z</p>
      </div>
    </React.Fragment>
  );
}

export default TopBar;
