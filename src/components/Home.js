import React, { Component } from "react";
import Doctor from "./Doctor";
import doctorJson from "../database/doctors.json";

export default class Home extends Component {
  state = {
    doctors: doctorJson
  };
  render() {
    const doctors = this.state.doctors.results;
    console.log(doctors);

    return (
      <div>
        {this.state.doctors.results.map(user => (
          <Doctor
            fullName={user.fullName}
            specialties={user.specialties}
            location={user.locations.map(location => location.name)}
            distance={user.locations.map(location => location.distance)}
          />
        ))}
      </div>
    );
  }
}
