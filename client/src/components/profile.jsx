import React, { Component } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
class Profile extends Component {
  state = {
    users: [],
    num: 1,
  };
  async componentDidMount() {
    try {
      const { data: users } = await axios.get(
        "https://random-data-api.com/api/users/random_user?size=" +
          this.state.num
      );
      this.setState({ users });
    } catch (err) {
      console.log("error: ", err);
    }
  }
  handleNumChange = async ({ currentTarget: input }) => {
    this.setState({ num: input.value });
    try {
      const { data: users } = await axios.get(
        "https://random-data-api.com/api/users/random_user?size=" +
          this.state.num
      );
      this.setState({ users });
    } catch (err) {
      console.log("error: ", err);
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="my-3">
          <center>Data Fetch from random API</center>
        </h1>
        <input
          type="number"
          className="form-control"
          value={this.state.num}
          onChange={this.handleNumChange}
        />

        <div>
          {this.state.users.map((user) => {
            return (
              <div className="card my-2">
                <div className="card-header">
                  {user.first_name + " " + user.last_name}
                </div>
                <div className="card-body">
                  <div>
                    <b>Email </b> {user.email}
                  </div>
                  <div>
                    <b>Gender </b> {user.gender}
                  </div>
                  <div>
                    <b>Phone </b> {user.phone_number}
                  </div>
                  <div>
                    <b>Subscription </b>
                    {user.subscription.plan}
                  </div>
                  <div>
                    <b>Social insurance number</b>{" "}
                    {user.social_insurance_number}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
