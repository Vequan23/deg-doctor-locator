import React, { Component } from "react";
import Img from "../assets/images/avatar.png";
import "../css/App.css";

export default class Doctor extends Component {
  render() {
    return (
      <div className="container">
        <div className="doctor-card">
          <img className="doctor-image" src={Img} alt="" />
          <div className="credentials">
            <h3>Susan M. Smith, MD</h3>
            <h4>Women's Health Dermatology</h4>
          </div>
          <div className="location">
            <p>Arbor Creek</p>
            <p>3 Miles</p>
          </div>
        </div>
      </div>
    );
  }
}
