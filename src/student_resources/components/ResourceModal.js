import React, { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import Select from "react-select";

import Modal from "../../shared/components/UIElements/Modal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./styling/AddResourceModal.css";

const ResourceModal = (props) => {
  //Import the useHttpClient hook to send requests to the backend
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  //State variables to store the form data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [audience, setAudience] = useState([]);
  const [image, setImage] = useState("");

  //Function to handle the change event for the title input field
  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  //Function to handle the change event for the description input field
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  //Function to handle the change event for the link input field
  const linkChangeHandler = (event) => {
    setLink(event.target.value);
  };

  //Function to handle the change event for the image input field
  const imageChangeHandler = (event) => {
    setImage(event.target.value);
  };

  //Function to reset the form fields
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setAudience([]);
    setLink("");
    setImage("");
  };

  //Function to handle the form submission
  const resourceFormValidation = () => {
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      link.trim() === "" ||
      image.trim() === ""
    ) {
      //Display an error message if any of the fields are empty
      console.log("Please enter all the required information");
      toast.error("Please enter all the required information!");
      resetForm();
      return false;
    } else {
      return true;
    }
  };

  //Function to handle the form submission
  const submitHandler = (event) => {
    event.preventDefault();

    //Validate the form fields, if the form is not valid, don't submit the form
    if (!resourceFormValidation()) {
      return;
    } else {
      addResource();
    }
  };
  //Send a request to the backend to add the resource to the database
  // WORK IN PROGRESS
  const addResource = async () => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_API_URL + "/resource/",
        "POST",
        JSON.stringify({
          title: title,
          tags: [],
          description: description,
          link: link,
          audience: audience.map((audience) => audience.value),
          image: image,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      console.log(responseData);

      if ((responseData.status = 201)) {
        toast.success("Resource added successfully!");

        //Reset the form fields
        resetForm();

        //Close the modal
        props.onCancel();
      }
    } catch (err) {
      console.log(err);
      console.log(err.message);

      if (err.message === "Failed to fetch") {
        //Display an error message if there was a problem adding the resource to the database
        toast.error("Could not add resource. Please try again later.");
      } else if (err.message === "Resource already exists") {
        //Display an error message if the resource already exists
        toast.error("Resource already exists!");
      } else if (
        err.message === "Resource creation failed, Could not access database"
      ) {
        //Display an error message if no resources were found
        toast.error("No resources found");
      }
    }
  };

  // Array of audience options that the user can select from
  const audienceOptions = [
    { value: "New Students", label: "New Students" },
    { value: "Continuing Students", label: "Continuing Students" },
    { value: "Graduating Students", label: "Graduating Students" },
    { value: "General", label: "General" },
  ];

  return (
    <div className="add-resource-modal">
      <Modal
        className="add-resource-modal"
        onCancel={props.onCancel}
        show={props.show}
        header="Add a Resource"
      >
        {isLoading && <LoadingSpinner asOverlay />}

        <form className="resource-form">
          <label htmlFor="title">Title</label>

          <input
            type="text"
            id="title"
            name="title"
            onChange={titleChangeHandler}
            value={title}
          />

          <label htmlFor="description">Description </label>

          <textarea
            id="description"
            name="description"
            onChange={descriptionChangeHandler}
            value={description}
          />

          <label htmlFor="audience">Audience</label>

          <Select
            options={audienceOptions}
            onChange={setAudience}
            value={audience}
            placeholder="Select Audience"
            isMulti
          />

          <label htmlFor="link">Link</label>

          <input
            type="text"
            id="link"
            name="link"
            onChange={linkChangeHandler}
            value={link}
          />

          <label htmlFor="image">Image</label>

          <input
            type="file"
            id="image"
            name="image"
            onChange={imageChangeHandler}
            value={image}
          />

          <div className="button-container">
            <button
              type="submit"
              className="submit-button"
              onClick={submitHandler}
            >
              Submit
            </button>

            <button onClick={props.onCancel} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ResourceModal;
