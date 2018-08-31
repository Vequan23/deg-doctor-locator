import React, { Component } from "react";
import Doctor from "./Doctor";
import doctorsJson from "../api/doctors.json";
import gradient from "../assets/images/gradient.png";
import logo from "../assets/images/logo.svg";
import showcaseImage from "../assets/images/hospital.png";
import swal from "sweetalert2";
import LoadingGif from "../assets/images/loading_gif.gif";

export default class Home extends Component {
  state = {
    doctors: doctorsJson.results,
    zip: "",
    miles: "All",
    gender: "noPreference",
    doctorsAreVisible: false,
    scrollPageDownHasBeenRan: false,
    showLoadingGifIsVisible: false
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
      this.showAlert();
    } else {
      this.initiateFilters();
    }
  };

  convertZipInputToNumber = zip => {
    return Number(zip);
  };

  initiateFilters = async () => {
    this.showLoadingGif();

    let doctorsFilteredByGender = this.filterDoctorsByGender();
    let doctorsFilteredByDistanceAndGender = this.filterDoctorsByDistance(
      doctorsFilteredByGender
    );

    await this.showDoctors();

    this.scrollPageDown();

    this.setState({
      doctors: doctorsFilteredByDistanceAndGender
    });
  };

  filterDoctorsByGender = () => {
    const gender = this.state.gender;
    let originalDoctorsData = doctorsJson.results;
    return originalDoctorsData.filter(doctor => {
      if (gender === "Male" || gender === "Female") {
        return doctor.gender === gender;
      } else {
        return doctor;
      }
    });
  };

  filterDoctorsByDistance = doctorsFilteredByGender => {
    const miles = this.state.miles;
    return doctorsFilteredByGender.filter(doctor => {
      if (miles === "All") {
        return doctor;
      } else {
        return Math.round(doctor.locations[0].distance) <= miles;
      }
    });
  };

  showDoctors = () => {
    this.setState({
      doctorsAreVisible: true
    });
  };

  scrollPageDown = () => {
    const { scrollPageDownHasBeenRan } = this.state;
    if (!scrollPageDownHasBeenRan) {
      window.scrollBy({
        top: 600,
        behavior: "smooth"
      });

      this.setState({
        scrollPageDownHasBeenRan: true
      });
    }
  };

  handleRangeChange = async e => {
    const doctorsAreVisible = this.state.doctorsAreVisible;
    if (!doctorsAreVisible) {
      this.showAlert();
    } else {
      this.setState({
        miles: await e.target.value
      });
      await this.initiateFilters();
    }
  };

  handleGenderChange = async e => {
    const doctorsAreVisible = this.state.doctorsAreVisible;
    if (!doctorsAreVisible) {
      e.preventDefault();
      alert("Please enter zip to filter");
    } else {
      this.setState({
        gender: await e.target.value
      });

      await this.initiateFilters();
    }
  };

  showAlert = () => {
    swal({
      type: "error",
      title: "Oops...",
      text: "please enter a valid zip code",
      footer: "<a href>Why do I have this issue?</a>"
    });
  };

  showLoadingGif = () => {
    this.setState({
      showLoadingGifIsVisible: true
    });
    this.removeLoadingGif();
  };

  removeLoadingGif = () => {
    setTimeout(() => {
      this.setState({
        showLoadingGifIsVisible: false
      });
    }, 800);
  };

  sendToDoctorLocation = doctorLocation => {
    window.location.href = doctorLocation;
  };

  sendToDoctorUrl = doctorUrl => {
    window.location.href = doctorUrl;
  };

  render() {
    const {
      doctors,
      miles,
      zip,
      doctorsAreVisible,
      showLoadingGifIsVisible
    } = this.state;

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
          <div className={doctorsAreVisible ? "filter-container " : "hidden"}>
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
              <p>
                Current: {miles} Miles From {zip}
              </p>
            </div>

            <div className="gender-filter">
              <label htmlFor="distance">Gender</label>
              <br />
              <input
                type="radio"
                onChange={this.handleGenderChange}
                value="noPreference"
                name="gender"
                defaultChecked
              />{" "}
              <span>No preference</span>
              <br />
              <input
                type="radio"
                onChange={this.handleGenderChange}
                value="Male"
                name="gender"
              />{" "}
              <span>Male</span>
              <br />
              <input
                type="radio"
                onChange={this.handleGenderChange}
                value="Female"
                name="gender"
              />
              <span>Female</span>
              <br />
            </div>
            <div className={showLoadingGifIsVisible ? "" : "hidden"}>
              <img className="loading-gif" src={LoadingGif} alt="" />
            </div>
          </div>
          <div
            className={
              doctorsAreVisible ? "doctor-container" : "hidden doctor-container"
            }
          >
            <div className="results-count">
              <p>
                Total Results:{" "}
                {doctors && doctorsAreVisible ? doctors.length : 0}
              </p>
            </div>
            {doctors ? (
              doctors.map((doctor, i) => (
                <Doctor
                  key={i}
                  fullName={doctor.fullName}
                  sendToDoctorUrl={this.sendToDoctorUrl.bind(null, doctor.url)}
                  specialties={doctor.specialties.map(
                    specialty => `${specialty}
            `
                  )}
                  formattedLocation={doctor.locations.map((location, i) =>
                    React.createElement(
                      "div",

                      { className: "doctor-location-container", key: i },
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
