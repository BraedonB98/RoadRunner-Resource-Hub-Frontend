import React from "react";

import { AiFillDelete } from "react-icons/ai";

import { AuthContext } from "../../shared/context/auth-context";


// List of resources used in the ResourceCard component, each resource has a name, search keywords, description, link, and image
// Add more resources to the list to display more resource cards

const resources = [
    { // Canvas resource
        name: "Canvas",
        search: ["Canvas", "Learning Management System", "Courses", "Assignments"],
        description: "Access your courses, submit assignments, and communicate with professors.",
        link: "https://msudenver.instructure.com/login/saml", // Canvas link
        image: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/canvas3.png",
    },
    { // Student Organizations/Clubs resource
        name: "Student Organizations",
        search: ["Student Organizations", "Clubs", "Student Life"],
        description: "Learn about student organizations and clubs at MSU Denver.",
        link: "https://roadrunnerlink.msudenver.edu/organizations", 
        image: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/clubs.jpg",
    },
    { // Campus Map resource
        name: "Campus Map",
        search: ["Campus Map", "Map", "Campus"],
        description: "View the campus map to help find your way around.",
        link: "https://map.concept3d.com/?id=225#!ct/2310?s",
        image: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/Campus1.jpg",
        },
    { // Tutoring Services resource
        name: "Tutoring Services",
        search: ["Tutoring Services", "Tutoring", "Academic Support"],
        description: "Learn more about tutoring services available on campus.",
        link: "https://www.msudenver.edu/student-academic-services/tutoring/",
        image: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/tutoring.jpg",
    },
    { // Class Schedule resource
        name: "Class Schedule",
        search: ["Class Schedule", "Schedule", "Courses"],
        description: "Access your class schedule to see class times and locations.",
        link: "https://ssomanager.msudenver.edu/ssomanager/saml/login?relayState=/c/auth/SSB?pkg=https://prod-banner.msudenver.edu/pls/prod_web/bwskfshd.P_CrseSchdDetl",
        image: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/class-schedule.jpg",
    },
    { // Auraria Campus Website resource
        name: "Auraria Campus Website",
        search: ["Auraria Campus", "Campus", "Website"],
        description: "Access information about campus life and resources.",
        link: "https://aurariacampus.edu/",
        image: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/Auraria_Campus_sign.jpg",
    },
    {// Academic Advising resource
        name: "Academic Advising",
        search: ["Academic Advising", "Advising", "Academic Support"],
        description: "Learn about academic advising and schedule appointments.",
        link: "https://www.msudenver.edu/advising/",
        image: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/Advising.jpg",
    },
    { // Library resource
        name: "Library",
        search: ["Library", "Research", "Books"],
        description: "Access books, articles, and resources for research needs.",
        link: "https://library.auraria.edu/",
        image: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/Auraria_Library.jpg",
    },
    {
        // Events resource
        name: "Events",
        search: ["Events", "Campus Events", "Activities"],
        description: "Stay updated with campus events, workshops, and activities.",
        link: "https://msudenver.trumba.com/",
        image: "../icons/schedule.png", 
    },
    {
        name: "Financial Aid",
        search: ["Financial Aid", "Scholarships", "Grants"],
        description: "Here you can find information about your financial aid package, scholarships, and grants.",
        link: "https://ssb.msudenver.edu/StudentSelfService/ssb/financialAid#!",
        image: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/Financial-Aid.png",
    },
    {
        name: "Roadrunner Athletics",
        search: ["Roadrunner Athletics", "Sports", "Athletics"],
        description: "Support MSU Denver's athletic teams and learn about upcoming games and events!",
        link: "https://roadrunnersathletics.com/index.aspx",
        image: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/athletics.jpg",
    },
    {
        name: "Apply for Graduation",
        search: ["Apply for Graduation", "Graduation", "Application"],
        description: "Click here to apply for graduation and receive your degree!",
        link: "https://ssb.msudenver.edu/StudentSelfService/ssb/graduationApplication#!",
        image: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/graduation.jpg",
    },
    {
        name: "Degree Progress Report",
        search: ["Degree Progress Report", "Degree", "Progress"],
        description: "View your degree progress report to see what courses you have completed and what you still need to take.",
        link: "https://degreeworks.msudenver.edu/Dashboard",
        image: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/degreePlan.jpg",
        
    },
    {
        name: "C2 Hub",
        search: ["C2 Hub", "Career", "Center"],
        description: "Click here to access the C2 Hub where you can find resources, events, and tools related to career development such as resume building, job searching, and more.",
        link: "https://www.msudenver.edu/classroom-to-career-hub/",
        image: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/C2Hub.jpg",
    },
    {
        name: "Student Email",
        search: ["Student Email", "Email", "Outlook"],
        description: "Access your MSU Denver student email account to stay updated with important information.",
        link: "https://email.msudenver.edu/",
        image: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/outlookEmail.jpg",
    },
    {
        name: "Career Link",
        search: ["Career Link", "Career", "Jobs"],
        description: "Access Career Link to find job and internship opportunities, career fairs, upload your resume, and more.",
        link: "https://shibboleth-msudenver-csm.symplicity.com/sso/",
        image: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/careerLink.jpg",
    },
    {
        name: "VMock",
        search: ["VMock", "Resume", "Feedback"],
        description: "Get instant feedback on your resume with VMock, a resume review tool!",
        link: "https://www.vmock.com/msudenver/",
        image: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/vmockResume.jpg",
    },
    {
        name: "Writing Center",
        search: ["Writing Center", "Writing", "Tutoring"],
        description: "Get help with your writing assignments at the Writing Center!",
        link: "https://www.msudenver.edu/writing-center/",
        image: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/writingCenter.webp",
    },
    {
        name: "Graduate Financial Aid",
        search: ["Graduate Financial Aid", "Graduate", "Scholarships"],
        description: "Here you can find information about financial aid for graduate students, scholarships, and grants.",
        link: "https://www.msudenver.edu/graduate-school/financialaid/",
        image: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/gradFinancialAid.webp",
    },
    {
        name: "Register for Classes",
        search: ["Register for Classes", "Registration", "Courses"],
        description: "Here you can register for classes, view your class schedule, and more!",
        link: "https://ssb.msudenver.edu/StudentRegistrationSsb/ssb/registration",
        image: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/Registration.jpg",
    }
];

// Resource component that displays the resource name, description, and image
// Will be used in the ResourceCard component to display each resource
const Resource = ({ name, description, link, image, onDelete, isBackendResource }) => {

    const auth = React.useContext(AuthContext);

    const imagePath = isBackendResource ? process.env.REACT_APP_ASSET_URL + "/" + image : image;

    return (
        <div className="resource-card" onClick={() => window.open(link, "_blank")}>
            <img src={imagePath} alt={name} className="resource-image" />
            <h2 className="resource-heading">{name}</h2>
            <p className="resource-description">{description}</p>

            {auth.isLoggedIn && isBackendResource && // If user is logged in and resource is from the backend, display delete button
            <button className="resource-button" onClick={(event) => {
                event.stopPropagation(); // Prevent the click event from bubbling up to the parent div
                onDelete(); // Call the onDelete function passed as a prop
            }
            }>Delete <AiFillDelete /></button>
            }

        </div>
    );
};

export { Resource, resources };