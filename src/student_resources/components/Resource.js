import React from "react";

import { AiFillDelete } from "react-icons/ai";

import Card from "../../shared/components/UIElements/Card";

import "../components/styling/Resource.css";

const Resource = (props) => {
  return (
    <Card
      className="resource-card"
      onClick={() => window.open(props.link, "_blank")}
    >
      <img
        src={process.env.REACT_APP_ASSET_URL + props.image}
        alt={props.title}
        className="resource-image"
      />
      <h2 className="resource-heading">{props.title}</h2>
      <p className="resource-description">{props.description}</p>
    </Card>
  );
};

export default Resource;
