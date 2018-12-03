import React from "react";
import TreeView from "deni-react-treeview";
import { Button, Checkbox } from "semantic-ui-react";

import cbcs from "./data/cbcs.json";

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.jPass = null;
  }

  componentDidMount() {
    var jPass = [];
    // if (Boolean(this.props.value.size > 0)) {
    // console.log("tree input", this.props.value.Entities.Childs[0]);
    // console.log("length", Boolean(this.props.value.Entities));
    console.log("prop", this.props.value);
    if (Boolean(this.props.value)) {
      for (var i in this.props.value) {
        console.log("id i", this.props.value[i]);
        var jSub = [];
        for (var j in this.props.value[i].Items) {
          console.log("id j", j, "name", this.props.value[i].Items[j]);
          jSub.push({
            id: i * 1000 + j,
            text: this.props.value[i].Items[j][0],
            isLeaf: true,
            state: 1
            // visibvar ItemList = React.createClass({le: this.props.value[0].children[i].children[j].visible
          });
        }
        jPass.push({
          children: jSub,
          id: i,
          text: this.props.value[i].Name
        });
      }
    }
    this.jPass = jPass;
    console.log("jpass", this.jPass);
    // }
  }

  addItemAndSubItem() {
    let api = this.refs.treeview.api;

    // let selectedItem = api.getSelectedItem();
    let selectedItem = api.getItems();

    //      if (selectedItem) {
    //       if (selectedItem.state === 1) {
    //         selectedItem.visible = true;
    //       } else if (selectedItem.state === 2) {
    //         selectedItem.visible = false;
    //       }
    //       // saveText(JSON.stringify(selectedItem), "filename.json");
    //       this.props.onPassSelected(selectedItem);
    //       // console.log("selected item", selectedItem);
    //       // api.removeItem(selectedItem.id);
    //     } else {
    //       alert("You have to select a item to remove it");
    //     }
  }

  render() {
    let treeData = cbcs;
    if (Boolean(this.jPass)) {
      // console.log("test", this.jPass);
      treeData = this.jPass;
    }
    return (
      <div>
        {/* <button onClick={this.addItemAndSubItem.bind(this)}>
          Click to hide the select item
        </button> */}
        <TreeView
          ref="treeview"
          // items={cbcs}
          items={treeData}
          // items={this.jPass}
          showCheckbox={true}
        />
      </div>
    );
  }
}

export default ItemList;
