import React from "react";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
function makeData() {
  return [
    {
      firstName: "judge",
      lastName: "babies",
      age: 16
    },
    {
      firstName: "quarter",
      lastName: "driving",
      age: 17
    },
    {
      firstName: "division",
      lastName: "society",
      age: 3
    }
  ];
}

class TableDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData()
    };
  }

  componentDidMount() {
    var jPass = [];
    // if (Boolean(this.props.value.size > 0)) {
    // console.log("tree input", this.props.value.Entities.Childs[0]);
    // console.log("length", Boolean(this.props.value.Entities));

    if (Boolean(this.props.value.length)) {
      for (var i in this.props.value) {
        // console.log("name ", this.props.value[i].Name);
        jPass.push({
          Name: this.props.value[i].Name
        });
      }
      //   for (var i in this.props.value.Entities.Childs[0].Childs) {
      //     // console.log("id i", this.props.value.Entities.Childs[0].Childs[i]);
      //     var jSub = [];
      //     for (var j in this.props.value.Entities.Childs[0].Childs[i].Childs) {
      //       // console.log(
      //       //   "id j",
      //       //   this.props.value.Entities.Childs[0].Childs[i].Childs[j].GUID
      //       // );
      //       jSub.push({
      //         id: i * 1000 + j,
      //         text: this.props.value.Entities.Childs[0].Childs[i].Childs[j].Name,
      //         isLeaf: true,
      //         state: 1
      //         // visibvar ItemList = React.createClass({le: this.props.value[0].children[i].children[j].visible
      //       });
      //     }
      //     jPass.push({
      //       children: jSub,
      //       id: i,
      //       text: this.props.value.Entities.Childs[0].Childs[i].Name
      //     });
      //   }
    }
    this.jPass = jPass;
    console.log("data is", this.jPass);
    // }
  }

  render() {
    const { data } = this.state;
    console.log("data", data);
    return (
      <div>
        <ReactTable
          data={this.jPass}
          columns={[
            {
              Header: "Property Name",
              columns: [
                {
                  Header: "Property Name",
                  accessor: "Name"
                }
              ]
            }
          ]}
          //   defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

export default TableDemo;
