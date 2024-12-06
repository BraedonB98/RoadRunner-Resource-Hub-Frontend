import React, { useState, useEffect, useContext } from "react"; // Import React and the useState, useEffect, and useContext hooks
import Resource from "./Resource"; // Import the Resource component

import { AuthContext } from "../../shared/context/auth-context";

import "../components/styling/ResourceList.css";

const ResourceList = (props) => {
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
};

export default ResourceList;
