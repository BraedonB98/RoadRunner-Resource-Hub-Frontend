import React, { useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';

import Modal from '../../shared/components/UIElements/Modal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';


import './styling/AddResourceModal.css';

const AddResourceModal = props => {

    //Import the useHttpClient hook to send requests to the backend
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    

    //State variables to store the form data
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [audience, setAudience] = useState([]);
    const [image, setImage] = useState();

    //Function to handle the change event for the title input field
    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    }

    //Function to handle the change event for the description input field
    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value);
    }

    //Function to handle the change event for the link input field
    const linkChangeHandler = (event) => {
        setLink(event.target.value);
    }

    //Function to handle the change event for the image input field
    const imageChangeHandler = (event) => {
        setImage(event.target.files[0]);
    }

    //Function to reset the form fields
    const resetForm = () => {
        setTitle('');
        setDescription('');
        setAudience([]);
        setLink('');
        setImage('');
    }

    //Function to handle the form submission
    const resourceFormValidation = () => {
        if (title.trim() === '' || description.trim() === '' || link.trim() === '' || !image || audience.length === 0) {
            //Display an error message if any of the fields are empty
            console.log('Please enter all the required information');
            toast.error('Please enter all the required information!');
            resetForm();
            return false;
        } else {
            return true;
        }
    }

    const submitHandler = async (event) => {
        event.preventDefault();
    
        // Validate form fields
        if (!resourceFormValidation()) {
            return;
        }
    
        // Prepare FormData
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('link', link);
        formData.append('image', image); // Add the image file
        audience.forEach(aud => formData.append('audience', aud.value)); // Append audience as array
    
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_API_URL + '/resource/resources',
                "POST",
                formData, // Send formData directly
                {
                    'Authorization': 'Bearer ' + auth.token
                    // Do not set 'Content-Type' here
                }
            );
    
            console.log(responseData);
        
            // Reload the page to display the new resource
            window.location.reload();
    
            // Display a success message
            toast.success('Resource added successfully!');

        } catch (err) {
            console.log(err);
            toast.error('Could not add resource. Please try again later.');
        }
    
        resetForm();
        props.onCancel();
    };

    // Array of audience options that the user can select from
    const audienceOptions = [
        { value: 'New Students', label: 'New Students' },
        { value: 'Continuing Students', label: 'Continuing Students' },
        { value: 'Graduating Students', label: 'Graduating Students' },
        { value: 'Dashboard', label: 'Dashboard' }
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

            <form className="resource-form" encType='multipart/form-data'>

                <label htmlFor="title">Title</label>

                <input type="text" id="title" name="title" onChange={titleChangeHandler} value={title} />

                <label htmlFor="description">Description </label>

                <textarea id="description" name="description" onChange={descriptionChangeHandler} value={description} />

                <label htmlFor="audience">Audience</label>

                <Select
                    options={audienceOptions}
                    onChange={setAudience}
                    value={audience}
                    placeholder="Select Audience"
                    isMulti
                />

                <label htmlFor="link">Link</label>

                <input type="text" id="link" name="link" onChange={linkChangeHandler} value={link} />

                <label htmlFor="image">Image</label>

                <input type="file" id="image" name="image" onChange={imageChangeHandler}  />

                <div className= "button-container">

                    <button type="submit" className="submit-button" onClick={submitHandler}>Submit</button>

                    <button onClick={props.onCancel} className="cancel-button">Cancel</button>

                </div>

            </form>

            </Modal>

        </div>
    );
    }

export default AddResourceModal;