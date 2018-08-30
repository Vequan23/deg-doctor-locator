import React, { Component } from "react";
import "../css/App.css";

export default function Doctor(props) {
  {
    return (
      <div className="doctor-card">
        <img
          className="doctor-image"
          src={require(`../assets/images/${props.image}`)}
          alt=""
        />
        <div className="credentials">
          <h3>{props.fullName}</h3>
          <h4>{props.specialties}</h4>
        </div>
        <div className="location">{props.formattedLocation}</div>
      </div>
    );
  }
}
