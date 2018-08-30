import React, { Component } from "react";
import Doctor from "./Doctor";
import doctorsJson from "../database/doctors.json";
import gradient from "../assets/images/gradient.png";
import logo from "../assets/images/logo.svg";
import showcaseImage from "../assets/images/hospital.png";

export default class Home extends Component {
  state = {
    doctors: doctorsJson.results,
    zip: [],
    miles: "All",
    gender: "noPreference",
    showDoctors: false
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
    const gender = this.state.gender;
    const miles = this.state.miles;
    let originalDoctorsData = doctorsJson.results;

    let doctorsFilteredByGender = originalDoctorsData.filter(doctor => {
      if (gender === "Male" || gender === "Female") {
        return doctor.gender === gender;
      } else {
        return doctor;
      }
    });

    let doctorsFilteredByDistance = doctorsFilteredByGender.filter(doctor => {
      if (miles === "All") {
        return doctor;
      } else {
        return Math.round(doctor.locations[0].distance) <= miles;
      }
    });

    this.setState({
      showDoctors: true
    });
    await this.setState({
      doctors: doctorsFilteredByDistance
    });

    await window.scroll({
      top: 600,
      behavior: "smooth"
    });
  };

  handleRangeChange = async e => {
    const showDoctors = this.state.showDoctors;
    if (!showDoctors) {
      alert("Please enter zip to filter");
    } else {
      this.setState({
        miles: await e.target.value
      });
      await this.filterDoctors();
    }
  };

  handleGenderChange = async e => {
    const showDoctors = this.state.showDoctors;
    if (!showDoctors) {
      e.preventDefault();
      alert("Please enter zip to filter");
    } else {
      this.setState({
        gender: await e.target.value
      });

      await this.filterDoctors();
    }
  };
  sendToDoctorLocation = doctorLocation => {
    window.location.href = doctorLocation;
  };

  sendToDoctorUrl = doctorUrl => {
    window.location.href = doctorUrl;
  };

  render() {
    const { doctors, miles, zip, showDoctors } = this.state;

    return (
      <div>
        <header>
          <img className="gradient" src={gradient} alt="" />
          <img className="logo" src={logo} alt="" />
        </header>
        <div className="hero">
          <img className="hero" src={showcaseImage} alt="" />
        </div>
        <div className="zip-input">
          <form>
            <input
              onChange={this.handleZipChange}
              placeholder="Zip"
              type="text"
            />
          </form>
          <button onClick={this.validateZip} className="btn">
            Search
          </button>
        </div>

        <div className="side-bar-doctor-container">
          <div className="filter-container card">
            <div className="distance-filter">
              <label htmlFor="distance">Distance</label>
              <input
                onChange={this.handleRangeChange}
                type="range"
                min="5"
                max="25"
                step="5"
                value={miles}
              />
              <input
                type="radio"
                onChange={this.handleGenderChange}
                value="noPreference"
                name="gender"
                defaultChecked
              />{" "}
              No Preference
              <input
                type="radio"
                onChange={this.handleGenderChange}
                value="Male"
                name="gender"
              />{" "}
              Male
              <input
                type="radio"
                onChange={this.handleGenderChange}
                value="Female"
                name="gender"
              />
              Female
              <p>
                Current: {miles} Miles From {zip}
              </p>
            </div>
            <div className="results-count">
              <p>
                Total Results: {doctors && showDoctors ? doctors.length : 0}
              </p>
            </div>
          </div>
          <div
            className={
              showDoctors ? "doctor-container" : "hidden doctor-container"
            }
          >
            {doctors ? (
              doctors.map(doctor => (
                <Doctor
                  fullName={doctor.fullName}
                  sendToDoctorUrl={this.sendToDoctorUrl.bind(null, doctor.url)}
                  specialties={doctor.specialties.map(
                    specialty => `${specialty}
            `
                  )}
                  formattedLocation={doctor.locations.map(location =>
                    React.createElement(
                      "div",
                      { className: "doctor-location-container" },
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
      </div>
    );
  }
}
