import React, { Component } from "react";
import Doctor from "./Doctor";
import doctorsJson from "../database/doctors.json";
import gradient from "../assets/images/gradient.png";
import logo from "../assets/images/logo.svg";
import showcaseImage from "../assets/images/hospital.png";

export default class Home extends Component {
  state = {
    doctors: [],
    showDoctors: false
  };
  render() {
    const doctors = this.state.doctors;

    return (
      <div>
        <header>
          <img className="gradient" src={gradient} alt="" />
          <img className="logo" src={logo} alt="" />
        </header>
        <div className="showcase">
          <img className="showcase" src={showcaseImage} alt="" />
        </div>
        <div className="zip-input">
          <form>
            <input type="text" />
          </form>
          <button className="btn">Search</button>
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
            <p>Total Results: {doctors ? doctors.length : 0}</p>
          </div>
        </div>
        <div className="doctor-container">
          {doctors.results ? (
            doctors.results.map(doctor => (
              <Doctor
                fullName={doctor.fullName}
                specialties={doctor.specialties.map(
                  specialty => `${specialty}
            `
                )}
                formattedLocation={doctor.locations.map(
                  location => `${location.name}
              ${Math.round(location.distance)} Miles

              `
                )}
                image={doctor.image ? doctor.image : "avatar.png"}
              />
            ))
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}
