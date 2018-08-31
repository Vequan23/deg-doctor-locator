import React from "react";

export default function Doctor(props) {
  return (
    <div className="doctor-card ">
      <img
        className="doctor-image"
        src={require(`../assets/images/${props.image}`)}
        alt=""
      />
      <div className="specialties">
        <h3 onClick={props.sendToDoctorUrl}>{props.fullName}</h3>
        <h4>{props.specialties}</h4>
      </div>
      <div className="location">{props.formattedLocation}</div>
    </div>
  );
}
