import React, { useState, useEffect, useContext } from "react"; // Import React and the useState, useEffect, and useContext hooks
import Resource from "./Resource"; // Import the Resource component

import { AuthContext } from "../../shared/context/auth-context";

import "../components/styling/ResourceList.css";
import toast from "react-hot-toast";

const ResourceList = (props) => {
  const [resourcesState, setResourcesState] = useState([]); // State for resources

  const auth = useContext(AuthContext);

  useEffect(() => {
    if (props.resources) {
      //Change this to if backend resources are aquired from get call
      setResourcesState(props.resources);
    }
  }, [
    props.resources,
    props.search,
    props.name,
    props.description,
    props.link,
    props.image,
  ]);

  const deleteResource = async (resourceId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/resource/resources/${resourceId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      const responseData = await response.json();

      console.log("Resource ID: ", resourceId);

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      console.log(responseData);

      toast.success(
        "Resource deleted successfully! Please refresh the page to see changes."
      );

      // Refresh the page to display new set of resources
      window.location.reload(); //!use state change state to resource array without resource(saves a reload)
    } catch (err) {
      console.log(err);
    }
  };

  // Render each resource using the Resource component
  return (
    <React.Fragment>
      {resourcesState.length > 0 ? (
        resourcesState.map((resource) => (
          <Resource
            key={resource._id || resource.name} // Use _id for backend resources, otherwise name
            name={resource.name || resource.title}
            search={resource.search}
            description={resource.description}
            link={resource.link}
            image={resource.image}
            onDelete={() => deleteResource(resource._id)}
          />
        ))
      ) : (
        <div></div>
      )}
    </React.Fragment>
  );
};

export default ResourceList;
