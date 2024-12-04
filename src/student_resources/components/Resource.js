import React from "react";

import { AiFillDelete } from "react-icons/ai";

import { AuthContext } from "../../shared/context/auth-context";

// Resource component that displays the resource name, description, and image
// Will be used in the ResourceCard component to display each resource
const Resource = (props) => {
  //props { name, description, link, image, onDelete }

  return (
    <div
      className="resource-card"
      onClick={() => window.open(props.link, "_blank")}
    >
      <img src={props.image} alt={props.name} className="resource-image" />
      <h2 className="resource-heading">{props.name}</h2>
      <p className="resource-description">{props.description}</p>

      {props.deleteButtonDisplay && ( // If user is logged in and resource is from the backend, display delete button
        <button
          className="resource-button"
          onClick={(event) => {
            event.stopPropagation(); // Prevent the click event from bubbling up to the parent div
            props.onDelete(); // Call the onDelete function passed as a prop
          }}
        >
          Delete <AiFillDelete />
        </button>
      )}
    </div>
  );
};

export default Resource;
