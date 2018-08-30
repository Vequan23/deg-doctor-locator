import React, { Component } from "react";
import Doctor from "./Doctor";
import doctorsJson from "../database/doctors.json";
import gradient from "../assets/images/gradient.png";
import logo from "../assets/images/logo.svg";
import showcaseImage from "../assets/images/hospital.png";

export default class Home extends Component {
  state = {
    doctors: [],
    zip: []
  };

  handleZipChange = e => {
    this.setState({
      zip: e.target.value
    });
  };

  validateZip = () => {
    let zip = this.state.zip;

    let convertedZip = this.convertZipInputToNumber(zip);

    if (zip.length !== 5 || !Number.isInteger(convertedZip)) {
      alert("please check zip");
    } else {
      this.filterDoctors();
    }
  };

  convertZipInputToNumber = zip => {
    return Number(zip);
  };

  filterDoctors = async () => {
    await this.setState({
      doctors: doctorsJson
    });

    await window.scroll({
      top: 600,
      behavior: "smooth"
    });
  };

  sendToDoctorLocation = doctorLocation => {
    window.location.href = doctorLocation;
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
            <input onChange={this.handleZipChange} type="text" />
          </form>
          <button onClick={this.validateZip} className="btn">
            Search
          </button>
        </div>
        <div className="filter-container">
          <div className="distance-filter">
            <label htmlFor="distance">Distance</label>
            <input type="range" min="1" max="100" id="myRange" />
            <p>Current: All Miles From</p>
          </div>
          <div className="results-count">
            <p>Total Results: {doctors.results ? doctors.results.length : 0}</p>
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
                formattedLocation={doctor.locations.map(location =>
                  React.createElement(
                    "div",
                    { className: "doctor-location" },
                    React.createElement(
                      "span",
                      {
                        onClick: this.sendToDoctorLocation.bind(
                          null,
                          location.url
                        )
                      },
                      location.name
                    ),
                    React.createElement(
                      "p",
                      null,
                      `${Math.round(location.distance)} Miles`
                    )
                  )
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
