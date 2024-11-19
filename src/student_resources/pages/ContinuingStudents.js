import React, { useContext, useState, useEffect } from "react"; 
import ResourceCard from "../components/ResourceCard";
import "../../student_resources/pages/styling/StudentResources.css";
import { AuthContext } from "../../shared/context/auth-context";
import { AiFillFileAdd } from "react-icons/ai";
import AddResourceModal from "../components/AddResourceModal";


// This is the MiddleYears page component for students in their second and third year at MSU Denver(Sophomore/Junior)
const MiddleYears = () => {
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
                // const response = await fetch('http://localhost:5000/api/resource/resources/continuingstudent');
                const response = await fetch(process.env.REACT_APP_BACKEND_API_URL + '/resource/resources/continuingstudent');
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

    return(
        <React.Fragment>

            <div className="ContinuingStudents-background">

                <div className="page-welcometext">
                    <h1>Welcome Continuing Students!</h1>
                    <p>Here are some resources you may find useful as you continue your journey at MSU Denver!</p>
                </div>

                <div className= "resource-button-container">

                    {auth.isLoggedIn && (<button className="new-resource-button" onClick={openModal}> Add New Resource <AiFillFileAdd /> </button>)}

                </div>

                <div className="welcome-container">

                    <ResourceCard name= "Tutoring Services" />

                    <ResourceCard name= "Library" />

                    <ResourceCard name= "Career Link" />

                    <ResourceCard name= "Writing Center" />

                    <ResourceCard resources={resources} />

                </div>

                    {/* This is the modal that will pop up when the "Add New Resource" button is clicked */}
                    <AddResourceModal show={showModal} onCancel={closeModal} />

            </div>

        </React.Fragment>
    )
}

export default MiddleYears;
