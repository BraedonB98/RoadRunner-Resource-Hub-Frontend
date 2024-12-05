import React from "react";

import { AiFillDelete } from "react-icons/ai";

import { AuthContext } from "../../shared/context/auth-context";

import "../components/styling/Resource.css";

const Resource = (props) => {
  return (
    <div
      className="resource-card"
      onClick={() => window.open(props.link, "_blank")}
    >
      <img src={props.image} alt={props.title} className="resource-image" />
      <h2 className="resource-heading">{props.title}</h2>
      <p className="resource-description">{props.description}</p>
    </div>
  );
};

export default Resource;
