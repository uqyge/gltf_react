import React, { Component } from "react";
import Tutorial from "./Tutorial";
import SidebarRightOverlay from "./side";
import SidebarLeftOverlay from "./treeview";

import "../css/App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Gltf front end tutorial</h2>
        </div>
        {/* <Tutorial /> */}

        <SidebarRightOverlay />
        {/* < SidebarLeftOverlay /> */}
        {/* < ButtonExampleLabeledBasic /> */}
      </div>
    );
  }
}

export default App;
