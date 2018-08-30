import React, { Component } from "react";
import Doctor from "./Doctor";
import doctorJson from "../database/doctors.json";
import gradient from "../assets/images/gradient.png";
import logo from "../assets/images/logo.svg";
import showcaseImage from "../assets/images/hospital.png";

export default class Home extends Component {
  state = {
    doctors: doctorJson
  };
  render() {
    const doctors = this.state.doctors.results;
    console.log(doctors);

    return (
      <div>
        <header>
          <img className="gradient" src={gradient} alt="" />
          <img className="logo" src={logo} alt="" />
        </header>
        <div className="showcase">
          <img className="showcase" src={showcaseImage} alt="" />
        </div>
        <div className="filter-container">
          <div className="distance-filter">
            <label htmlFor="distance">Distance</label>
            <input
              type="range"
              min="1"
              max="100"
              value="50"
              class="slider"
              id="myRange"
            />
            <p>Current: All Miles From</p>
          </div>
          <div className="results-count">
            <p>Total Results: {doctors.length}</p>
          </div>
        </div>
        {this.state.doctors.results.map(doctor => (
          <Doctor
            fullName={doctor.fullName}
            specialties={doctor.specialties.map(
              specialty => `${specialty}
              `
            )}
            formattedLocation={doctor.locations.map(
              location => `${location.name} ${Math.round(location.distance)}
              `
            )}
          />
        ))}
      </div>
    );
  }
}
