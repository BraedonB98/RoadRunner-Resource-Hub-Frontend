import React, { useState, useEffect, useContext } from "react"; // Import React and the useState, useEffect, and useContext hooks
import Resource from "./Resource"; // Import the Resource component

import { AuthContext } from "../../shared/context/auth-context";

import "../components/styling/ResourceList.css";

const ResourceList = (props) => {
  //   const deleteResource = async (resourceId) => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:5000/api/resource/resources/${resourceId}`,
  //         {
  //           method: "DELETE",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + auth.token,
  //           },
  //         }
  //       );

  //       const responseData = await response.json();

  //       console.log("Resource ID: ", resourceId);

  //       if (!response.ok) {
  //         throw new Error(responseData.message);
  //       }

  //       console.log(responseData);

  //       toast.success(
  //         "Resource deleted successfully! Please refresh the page to see changes."
  //       );

  //       // Refresh the page to display new set of resources
  //       window.location.reload(); //!use state change state to resource array without resource(saves a reload)
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  // Render each resource using the Resource component
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
