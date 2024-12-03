import React, { useContext, useEffect, useState} from "react";
import ResourceList from "../components/ResourceList";

import { AiFillFileAdd } from "react-icons/ai";
import AddResourceModal from "../components/AddResourceModal";

import { AuthContext } from "../../shared/context/auth-context";

import "../../student_resources/pages/styling/StudentResources.css";

// This is the FirstYear page component for students in their first year at MSU Denver(Freshman/Transfer)
const FirstYear = () => {
    const auth = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false); // This is the state that will determine if the modal is open or not

    const [resources, setResources] = useState([]);

    const openModal = () => { // This function will open the modal
        setShowModal(true);
    }

    const closeModal = () => { // This function will close the modal
        setShowModal(false);
    }

    useEffect(() => {
        const fetchResources = async () => {
            try {
                // const response = await fetch('http://localhost:5000/api/resource/resources/newstudent');
                const response = await fetch(process.env.REACT_APP_BACKEND_API_URL + '/resource/resources/newstudent');
                const responseData = await response.json();

                console.log(responseData);

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                // Filter the resources to only show the resources created by the user
                const userResources = responseData.resources.filter(resource => resource.creator === auth.UID);
                setResources(userResources);

                console.log("User ID: ", auth.UID);
                console.log("creator: ", userResources.creator);
                console.log("This is the user's resources: ", userResources);
            } catch (err) {
                console.log(err);
            }
        };

        fetchResources();
    }
    , [auth.UID]);

    return (
        <React.Fragment>

            <div className= "NewStudents-background">

                <div className="page-welcometext">
                    <h1>Welcome New Students!</h1>
                    <p>Here are some resources you may find useful as you start your journey at MSU Denver as a Freshman or Transfer student!</p>
                    <p>Such as getting to know the campus, your class schedule, and other resources to help you succeed!</p>
                </div>

                <div className= "resource-button-container">

                    {auth.isLoggedIn && (<button className="new-resource-button" onClick={openModal}> Add New Resource <AiFillFileAdd /> </button>)}

                </div>

                <div className="welcome-container">

                    <ResourceList name= "Student Organizations" />

                    <ResourceList name= "Campus Map" />

                    <ResourceList name= "Auraria Campus Website" />

                    <ResourceList name= "Class Schedule" />

                    <ResourceList name= "Student Email" />

                </div>

                {/* This is the modal that will pop up when the "Add New Resource" button is clicked */}
                <AddResourceModal show={showModal} onCancel={closeModal} />

            </div>

        </React.Fragment>
    )
}

export default FirstYear;