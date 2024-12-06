import React, { useContext, useEffect, useState } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { AuthContext } from "../../shared/context/auth-context";
import "./styling/StudentResourcePage.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

// Components
import ResourceList from "../components/ResourceList";
import ResourceModal from "../components/ResourceModal";
import EventsComponent from "../components/EventsComponent"; // Ensure this path matches your structure

const StudentResourcesPage = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showResourceModal, setShowResourceModal] = useState(false); // This is the state that will determine if the modal is open or not
  const [loadedEvents, setLoadedEvents] = useState([]);
  const [loadedResources, setLoadedResources] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchResources = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_API_URL}/resource/public/${props.audience}`,
          "GET",
          null,
          { Authorization: `Bearer ${auth.token}` },
          { signal: abortController.signal }
        );
        if (responseData.resources) {
          setLoadedResources(responseData.resources);
        } else {
          setLoadedResources([]);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
        }
      }
    };
    fetchResources();
    return () => {
      abortController.abort();
    };
  }, [sendRequest, auth, props.audience]);

  const openResourceModal = () => {
    setShowResourceModal(true);
  };

  const closeResourceModal = () => {
    setShowResourceModal(false);
  };

  const decideBackgroundImage = (audience) => {
    if (audience === "NewStudents") {
      return (
        process.env.REACT_APP_ASSET_URL +
        "/data/frontendref/images/backgroundImages/NewStudents.jpg"
      );
    } else if (audience === "ContinuingStudents") {
      return (
        process.env.REACT_APP_ASSET_URL +
        "/data/frontendref/images/backgroundImages/ContinuingStudents.jpg"
      );
    } else if (audience === "GraduatingStudents") {
      return (
        process.env.REACT_APP_ASSET_URL +
        "/data/frontendref/images/backgroundImages/GraduatingStudents.jpg"
      );
    } else {
      return (
        process.env.REACT_APP_ASSET_URL +
        "/data/frontendref/images/backgroundImages/Home.jpg"
      );
    }
  };
  const backgroundImageURL = decideBackgroundImage(props.audience);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div
        className="student-resource-page-background"
        style={{
          backgroundImage: `url(${backgroundImageURL})`,
        }}
      >
        <br />
        <br />
        <br />

        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}

        {!isLoading && loadedEvents && <EventsComponent />}

        {!isLoading && auth.isLoggedIn && loadedResources && (
          <Button className="new-resource-button" onClick={openResourceModal}>
            {" "}
            Create New Resource <AiFillFileAdd />{" "}
          </Button>
        )}

        {!isLoading && loadedResources && (
          <ResourceList resources={loadedResources} />
        )}

        {!isLoading && loadedResources && (
          <ResourceModal
            show={showResourceModal}
            onCancel={closeResourceModal}
          />
        )}
      </div>

      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
    </React.Fragment>
  );
};

export default StudentResourcesPage;
