import React, { Component } from "react";
import Img from "../assets/images/avatar.png";
import "../css/App.css";

export default function Doctor(props) {
  {
    return (
      <div className="doctor-card">
        <img className="doctor-image" src={Img} alt="" />
        <div className="credentials">
          <h3>{props.fullName}</h3>
          <h4>{props.specialties}</h4>
        </div>
        <div className="location">
          <p>{props.formattedLocation}</p>
        </div>
      </div>

      // <div className="card">
      //   <img className="doctor-image" src={Img} alt="" />
      //   <div className="credentials">
      //     <h3>{props.fullName}</h3>
      //     <h4>{props.specialties}</h4>
      //   </div>
      //   <div className="location">
      //     <p>{props.formattedLocation}</p>
      //   </div>
      // </div>
    );
  }
}
