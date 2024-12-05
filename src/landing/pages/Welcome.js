import React, { useContext, useEffect, useState } from "react";
import ResourceList from "../../student_resources/components/ResourceList";
import ResourceModal from "../../student_resources/components/ResourceModal";

import { AiFillFileAdd } from "react-icons/ai";
import { AuthContext } from "../../shared/context/auth-context";
import "../../student_resources/pages/styling/StudentResources.css";
import EventsComponent from "../../student_resources/components/EventsComponent"; // Ensure this path matches your structure

const Welcome = () => {
  const auth = useContext(AuthContext);
  const [showResourceModal, setShowResourceModal] = useState(false); // This is the state that will determine if the modal is open or not
  const [resources, setResources] = useState([
    {
      // Canvas resource
      title: "Canvas",
      tags: ["Canvas", "Learning Management System", "Courses", "Assignments"],
      description:
        "Access your courses, submit assignments, and communicate with professors.",
      link: "https://msudenver.instructure.com/login/saml", // Canvas link
      image:
        process.env.REACT_APP_ASSET_URL +
        "/data/frontendref/images/canvas3.png",
    },
    {
      // Student Organizations/Clubs resource
      title: "Student Organizations",
      tags: ["Student Organizations", "Clubs", "Student Life"],
      description: "Learn about student organizations and clubs at MSU Denver.",
      link: "https://roadrunnerlink.msudenver.edu/organizations",
      image:
        process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/clubs.jpg",
    },
    {
      // Campus Map resource
      title: "Campus Map",
      tags: ["Campus Map", "Map", "Campus"],
      description: "View the campus map to help find your way around.",
      link: "https://map.concept3d.com/?id=225#!ct/2310?s",
      image:
        process.env.REACT_APP_ASSET_URL +
        "/data/frontendref/images/Campus1.jpg",
    },
  ]);

  const openResourceModal = () => {
    setShowResourceModal(true);
  };

  const closeResourceModal = () => {
    setShowResourceModal(false);
  };

  return (
    <React.Fragment>
      <div className="homePage-background">
        <br />
        <br />
        <br />

        {auth.isLoggedIn && (
          <button className="new-resource-button" onClick={openResourceModal}>
            {" "}
            Create New Resource <AiFillFileAdd />{" "}
          </button>
        )}

        {/* <button className="new-resource-button" onClick={openModal}> Add New Resource <AiFillFileAdd /> </button> */}

        <EventsComponent />
        <ResourceList resources={resources} />

        <ResourceModal show={showResourceModal} onCancel={closeResourceModal} />
      </div>
    </React.Fragment>
  );
};

export default Welcome;
