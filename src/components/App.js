import React, { Component } from "react";
import SidebarRightOverlay from "./side";
// import SplitterLayout from "react-splitter-layout";

import Example from "./Tree.js";

import "../css/App.css";

class App extends Component {
  render() {
    let objTree = null;

    // console.log(this.selectedObj);
    // // if (this.state.jsonData.size > 0) {
    // // if (Boolean(this.state.jsonData)) {
    // if (Boolean(this.state.jsonData)) {
    //   console.log("jdata", this.state.jsonData.length);
    //   objTree = (
    //     <Example
    //       value={this.state.jsonData}
    //       onPassSelected={this.passSelected}
    //     />
    //   );
    // }

    // console.log(this.selectedObj);

    // if (this.state.jsonData.length) {
    //   console.log("jdata", this.state.jsonData.length);
    //   objTree = (
    //     <Example
    //       value={this.state.jsonData}
    //       onPassSelected={this.passSelected}
    //     />
    //   );
    // }

    return (
      // <div className="App">
      //   <div className="App-header">
      //     <h2>Gltf front end tutorial</h2>
      //   </div>
      //   <SidebarRightOverlay />
      // </div>
      // <SplitterLayout>
      // <div>
      //   Information Window
      //   {objTree}
      // </div>
      <div>
        <SidebarRightOverlay />
        {/* part 1 */}
      </div>
      // </SplitterLayout>
    );
  }
}

export default App;
