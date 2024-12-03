import React, { useEffect, useState } from "react";
import "../components/styling/Events.css";
const events = [
  {
    name: "MSU Denver Student Government Assembly Meeting",
    date: "Every other Thursday",
    time: "5:00 PM",
    location: "Tivoli 320",
    description:
      "Join the Student Government Assembly to learn about upcoming events and initiatives.",
    image:
      process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/Campus1.jpg",
  },
  {
    name: "Socktober",
    date: "October 1st - October 31st",
    time: "All Day",
    location: "MSU Denver",
    description: "Donate new socks to the MSU Denver Food Bank.",
    image:
      process.env.REACT_APP_ASSET_URL +
      "/data/frontendref/images/socktober.jpg",
  },
  {
    name: "Career Fair",
    date: "October 15th",
    time: "10:00 AM - 2:00 PM",
    location: "Tivoli Turnhalle",
    description:
      "Network with potential employers and discover internship opportunities.",
    image:
      process.env.REACT_APP_ASSET_URL +
      "/data/frontendref/images/TivoliMain.webp",
  },
  {
    name: "Health & Wellness Expo",
    date: "October 20th",
    time: "10:00 AM - 5:00 PM",
    location: "Student Union",
    description:
      "Explore resources for mental, physical, and emotional well-being.",
    image:
      process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/Health.jpg",
  },
  {
    name: "Alumni Networking Night",
    date: "October 25th",
    time: "6:00 PM - 9:00 PM",
    location: "Alumni Hall",
    description: "Meet MSU Denver alumni and expand your professional network.",
    image:
      process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/JSSB.jpg",
  },
  {
    name: "Cultural Heritage Celebration",
    date: "November 1st",
    time: "3:00 PM - 7:00 PM",
    location: "Campus Green",
    description:
      "Celebrate the cultural diversity of our campus with music, food, and art.",
    image:
      process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/culture.webp",
  },
  {
    name: "Leadership Workshop",
    date: "November 3rd",
    time: "1:00 PM - 4:00 PM",
    location: "Room 220",
    description: "Enhance your leadership skills with interactive workshops.",
    image:
      process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/tivoli.jpg",
  },
  {
    name: "Environmental Sustainability Fair",
    date: "November 5th",
    time: "9:00 AM - 3:00 PM",
    location: "Tivoli Quad",
    description: "Learn about sustainability initiatives on campus and beyond.",
    image:
      process.env.REACT_APP_ASSET_URL +
      "/data/frontendref/images/environment.webp",
  },
  {
    name: "Study Abroad Information Session",
    date: "November 7th",
    time: "12:00 PM - 1:00 PM",
    location: "Room 310",
    description: "Discover study abroad opportunities available to students.",
    image:
      process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/Campus1.jpg",
  },
  {
    name: "Final Exam Study Jam",
    date: "December 5th",
    time: "5:00 PM - 11:00 PM",
    location: "Library",
    description:
      "Join us for a study session with snacks and support from tutors.",
    image:
      process.env.REACT_APP_ASSET_URL +
      "/data/frontendref/images/GradSchool.jpg",
  },
];

const EventsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);

  useEffect(() => {
    const updateCardsPerSlide = () => {
      if (window.innerWidth <= 768) {
        setCardsPerSlide(1);
      } else {
        setCardsPerSlide(3);
      }
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);

    return () => {
      window.removeEventListener("resize", updateCardsPerSlide);
    };
  }, []);

  const nextSlide = () => {
    if (currentIndex + cardsPerSlide < events.length) {
      setCurrentIndex(currentIndex + 1); // Move by one card
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Move by one card
    }
  };

  return (
    <div className="events-carousel">
      <button
        className="arrow-button left-arrow"
        onClick={prevSlide}
        disabled={currentIndex === 0}
      >
        &#8592;
      </button>

      <div
        className={`events-wrapper ${cardsPerSlide === 1 ? "single-card" : ""}`}
      >
        {events
          .slice(currentIndex, currentIndex + cardsPerSlide)
          .map((event, index) => (
            <div key={index} className="event-card hover-effect">
              <div className="event-card-line"></div>
              <img className="event-image" src={event.image} alt={event.name} />
              <div className="event-card-content">
                <h2 className="event-name">{event.name}</h2>
                <p className="event-date-time">
                  {event.date} at {event.time}
                </p>
                <p className="event-description">{event.description}</p>
                <p className="event-location">{event.location}</p>
                <a href="#" className="event-read-more">
                  Read More
                </a>
              </div>
            </div>
          ))}
      </div>

      <button
        className="arrow-button right-arrow"
        onClick={nextSlide}
        disabled={currentIndex + cardsPerSlide >= events.length}
      >
        &#8594;
      </button>
    </div>
  );
};

export default EventsComponent;
