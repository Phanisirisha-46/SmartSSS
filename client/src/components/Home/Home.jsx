import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap"; // Import Bootstrap Carousel
import "bootstrap/dist/css/bootstrap.min.css";
import collage from "../../assets/collage-removebg-preview.png"; // FIXED IMPORT
import m from "../../assets/men-removebg-preview.png";
import help from "../../assets/help-removebg-preview.png";
import { MdPersonAdd } from "react-icons/md"; 
import "./Home.css";
import steps from "../../assets/steps.png";
import  Faq from '../../components/FAQ/Faq';
import Books from '../../components/Books/Books';
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap"; 
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userLoginContext } from "../../contexts/UserLoginStore"; // Correct path


function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    // Function to animate numbers
    const animateNumbers = () => {
      const stats = document.querySelectorAll('.stat-number');
      stats.forEach(stat => {
        const target = +stat.getAttribute('data-target'); // Final number
        const duration = 2000; // Total animation time in milliseconds
        const interval = 30; // Time between updates in milliseconds
        const increment = Math.ceil(target / (duration / interval)); // Increment per interval
        let current = 0;

        const updateNumber = setInterval(() => {
          current += increment;
          if (current >= target) {
            stat.textContent = target.toLocaleString(); // Format number with commas
            clearInterval(updateNumber); // Stop the interval
          } else {
            stat.textContent = current.toLocaleString();
          }
        }, interval);
      });
    };
      // Start animation on component mount
      animateNumbers();
    }, []);

  const [hovered, setHovered] = useState(false);

  const imageStyle = {
    maxWidth: "100%",
    height: "auto",
    width: "400px",
    transition: "all 0.3s ease-in-out",
    transform: hovered ? "scale(0.9)" : "scale(1)",
    boxShadow: hovered ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none"
  };

  const [show, setShow] = useState(false);
  const [mentorData, setMentorData] = useState({
    name: "",
    image: "",
    subjects: "",
    charge: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    setMentorData({ ...mentorData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/add-mentor", mentorData);
      alert(response.data.message);
      setShow(false);
      setMentorData({ name: "", image: "", subjects: "", charge: "" }); // Reset form
    } catch (error) {
      alert("Error adding mentor: " + error.response?.data?.error);
    }
  };
  const { currentUser } = useContext(userLoginContext);
  const [isMentor, setIsMentor] = useState(false);

  useEffect(() => {
    const checkMentorStatus = async () => {
      if (!currentUser) return; // Ensure currentUser exists before API call

      try {
        const response = await axios.get("http://localhost:3000/mentors"); // API to fetch mentors
        const mentorList = response.data; // Assuming it returns an array of mentor names

        setIsMentor(mentorList.includes(currentUser.name)); // Update mentor status
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    checkMentorStatus();
  }, [currentUser]);

  return (

    <div className="container mt-5">
      {/* ✅ Add Mentor Button */}
      <div>
      <h5>{currentUser ? `Hi ${currentUser.name} 👋` : "Welcome Guest!"}</h5>
      {currentUser && (
        <button className="btn btn-success" onClick={() => navigate("/dashboard/profile")}>
          View Profile
        </button>
        
      )}
    </div>

    <br />
  {/* ✅ Add Mentor Button (Only if user is NOT a mentor) */}
  {!isMentor && currentUser && (
        <div className="text-center mb-4">
          <button className="btn btn-success" onClick={() => setShow(true)}>
            <MdPersonAdd className="me-2" /> Add me as Mentor
          </button>
        </div>
      )}


      {/* ✅ Mentor Form Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Mentor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={mentorData.name} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" name="image" value={mentorData.image} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subjects Interested</Form.Label>
              <Form.Control type="text" name="subjects" value={mentorData.subjects} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Payment Charge (₹)</Form.Label>
              <Form.Control type="number" name="charge" value={mentorData.charge} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number (+91)</Form.Label>
              <Form.Control type="text" name="number" value={mentorData.number} onChange={handleChange} required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <div className="row">
        {/* Card 1 */}
        <div className="col-sm-6">
          <div className="card-body text-start ">
            <h2 className="card-title text-start">
              Bridge to the future is built with the strength of innovation and the vision of progress.
            </h2>
            <br />
            <p className="card-text">
              Empowering innovation, SmartBridge builds smarter paths that bridge gaps between people, ideas, and progress.
            </p>
            <button className="btn btn-primary" onClick={() => navigate("/dashboard/mentors")}>
          Explore Mentors
          </button>
          </div>
        </div>

        {/* Card 2 with Carousel */}
        <div className="col-sm-5 m-4">
          <div className="">
            <div className="">
              <Carousel interval={2000} controls={true} indicators={true} pause="hover">
                <Carousel.Item>
                  <img className="d-block w-100" src="https://cdn.prod.website-files.com/5d26256b528d2e079bc08d82/622f3b0c4423ac76de1bc765_16.png" alt="First slide" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src="https://cdn.prod.website-files.com/5d26256b528d2e079bc08d82/618e8bfbb4373c842a1c74cf_Untitled%20design%20(10).png" alt="Second slide" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src="https://www.sfgmentornet.com/wp-content/uploads/2022/05/2.png" alt="Third slide" />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
      </div>

     
    
      <div className="stats-container">
      <div className="stats-card">
        <div className="stat">
          <span className="stat-number" data-target="95">0</span>%
          <p>Happy Members</p>
        </div>
        <div className="stat">
          <span className="stat-number" data-target="100">0</span>%
          <p>Expert Mentors</p>
        </div>
        <div className="stat">
          <span className="stat-number" data-target="500">0</span>+
          <p>Active Users</p>
        </div>
      </div>
    </div>


      
      

      {/* Features Section */}
      <br /><br />
      <div id="features" className="text-center">
        <h2 className="card-title" style={{ color: "rgb(30, 83, 136)" }}>Features</h2>
        <h3 className="card-text text-blue">What you can do by signing up to the platform here?</h3>
      </div>

      {/* Features Grid */}
      <div className="container mt-5">
        <div className="row">
          {/* Feature Cards */}
          {[ 
            { title: "Why Choose Mentor?", text: "A mentor brings years of experience, offering valuable insights and knowledge." },
            { title: "Find Mentor with interest", text: "Explore the network of seasoned mentors, ready to illuminate your career path." },
            { title: "Continuous Learning and Development", text: "Embark on a journey of continuous growth through curated resources and tailored learning paths." },
            { title: "Convenient Scheduling, Anytime, Always", text: "Enjoy the flexibility of scheduling mentor sessions and accessing learning materials anytime." },
            { title: "User-Friendly Platform, Seamless Experience", text: "Navigate our intuitive platform effortlessly for an enjoyable experience." },
            { title: "Enhance Skills with Industry Experts", text: "Elevate your skills and knowledge by learning directly from industry experts." }
          ].map((feature, index) => (
            <div className="col-sm-6 mb-4" key={index}>
              <div className="card"  style={{ boxShadow: "0 4px 8px rgba(0, 0, 139, 0.5)" }}>
                <div className="card-body first">
                  <h2 className="card-title" style={{ color: "rgb(30, 83, 136)" }}>{feature.title}</h2>
                  <br />
                  <p className="card-text">{feature.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
          <br/>
      {/* Image Section with Hover Effect */}
      <div className="row justify-content-center">
        <div className="text-center">
          <img
            src={m}
            alt="Collage Section"
            className="img-fluid px-3 rounded-5 image"
            style={imageStyle}
          />
          <img
            src={collage}
            alt="Collage Section"
            className=""
            style={imageStyle}
          />
          <img
            src={help}
            alt="Collage Section"
            className=""
            style={imageStyle}
          />
        </div>
      </div>
          <br /><br />   <br /><br />
      <div id="steps" className="text-center">
        <h2 className="" style={{ color: "rgb(30, 83, 136)" }}>Steps</h2>
        <h3 className="">What are the steps to Follow?</h3>
      </div>
          <br/>
    <div className="">
  <div className="gud">
    <img
      src={steps}
      alt="Notebook"
      className="img-fluid"
    />
  </div>
</div>
<br/><br/>
          <Faq/>

          <Books/>
    </div>
  );
}

export default Home;
