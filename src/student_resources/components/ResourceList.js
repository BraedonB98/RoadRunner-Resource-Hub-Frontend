import React, { useState, useEffect, useContext } from "react"; // Import React and the useState, useEffect, and useContext hooks
import Resource from "./Resource"; // Import the Resource component

import { AuthContext } from "../../shared/context/auth-context";

import "../components/styling/ResourceList.css";

const ResourceList = (props) => {
  console.log(props.resources);
  if (props.resources.length !== 0) {
    return (
      <ul className="resource-list">
        {props.resources.map((resource) => (
          <Resource
            key={resource._id}
            title={resource.title}
            tags={resource.tags}
            description={resource.description}
            link={resource.link}
            image={resource.image}
            audience={resource.audience}
            onDelete={props.onDeleteTask}
            onEdit={props.onEditTask} //Not sure if this will be needed.
          />
        ))}
      </ul>
    );
  } else {
    return (
      <div className="resource-list-missing">
        <h2>No resources found. Maybe create one?</h2>
      </div>
    );
  }
};

export default ResourceList;
