import React, { Component } from "react";
import Img from "../assets/images/avatar.png";

export default class Doctor extends Component {
  render() {
    return (
      <div className="doctor-card">
        <img src={Img} alt="" />
        <h3>Susan M. Smith, MD</h3>
        <h4>Women's Health Dermatology</h4>
        <p>Arbor Creek</p>
        <p>3 Miles</p>
        <p>Olathe Health Family Medicine</p>
        <p>10 Miles</p>
      </div>
    );
  }
}
