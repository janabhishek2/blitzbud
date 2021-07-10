import _ from "lodash";
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUsers, deleteUser } from "../services/userService";
import { searchManagers } from "./../utils/searchManagers";
class Managers extends Component {
  state = {
    managers: [],
    orderByName: "asc",
    searchString: "",
  };
  async componentDidMount() {
    try {
      const { data: managers } = await getUsers();
      this.setState({ managers });
    } catch (err) {
      console.log(err.message);
    }
  }
  handleSort = () => {
    if (this.state.orderByName == "asc") {
      const managers = [...this.state.managers];
      const newMgrs = _.orderBy(managers, ["name"], ["desc"]);

      this.setState({ managers: newMgrs, orderByName: "desc" });
    } else {
      const managers = [...this.state.managers];
      const newMgrs = _.orderBy(managers, ["name"], ["asc"]);

      this.setState({ managers: newMgrs, orderByName: "asc" });
    }
  };
  handleDelete = async (manager) => {
    let oldManagers = [...this.state.managers];

    const managers = oldManagers.filter((mgr) => {
      return mgr._id != manager._id;
    });
    this.setState({ managers });

    try {
      const out = await deleteUser(manager._id);
      if (out.status == 200) {
        toast.success("Manager Deleted");
        return;
      }
    } catch (err) {
      toast.error("Something Went Wrong");
      this.setState({ managers: oldManagers });
    }
  };
  handleChange = ({ currentTarget: inp }) => {
    this.setState({ searchString: inp.value });
  };
  render() {
    const managers = this.state.managers;
    const filtered = searchManagers(this.state.searchString, managers);

    return (
      <React.Fragment>
        <ToastContainer />
        <h1 className="my-3">
          <center>All Managers</center>
        </h1>
        <br />

        {
          <p className="my-3">
            <center>
              {" "}
              Showing {this.state.managers.length} managers in the database
            </center>
          </p>
        }
        <div className="form-group">
          <input
            className="form-control"
            value={this.state.searchString}
            onChange={this.handleChange}
            placeholder="Search by email ... "
          ></input>
        </div>
        <button className="btn btn-primary my-3" onClick={this.handleSort}>
          Sort By Name
        </button>
        <table className="table table-hover table-bordered mt-3 text-center">
          <thead className="thead-dark">
            <tr>
              <th>Manager ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((manager) => {
              return (
                <tr key={manager._id}>
                  <td>{manager._id}</td>
                  <td>{manager.name}</td>
                  <td>{manager.email}</td>
                  <td>{manager.contact}</td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(manager)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Managers;
