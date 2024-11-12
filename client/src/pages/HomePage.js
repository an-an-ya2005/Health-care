import React, { useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // You can still load data if needed, but not showing it here.
    const getUserData = async () => {
      try {
        await axios.get("/api/v1/user/getAllDoctors", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  return (
    <Layout>
      {/* Welcome Section */}
      <div style={{ padding: "40px", textAlign: "center" }}>
        <Title level={2}>Welcome to Smart Appointment</Title>
        <Paragraph style={{ fontSize: "18px" }}>
          We make healthcare easy and accessible. Book appointments with top
          doctors, get personalized care, and manage your health efficiently.
        </Paragraph>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate("/appointments")}
          style={{ marginTop: "20px" }}
        >
          Book an Appointment
        </Button>
      </div>

      {/* About Section */}
      <div style={{ padding: "40px 20px", backgroundColor: "#f9f9f9" }}>
        <Title level={3} className="text-center">
          Why Choose Smart Appointment?
        </Title>
        <Paragraph style={{ fontSize: "16px" }}>
          - Seamless booking experience with trusted doctors.<br />
          - Get notifications and reminders for your upcoming appointments.<br />
          - Easy access to your medical records anytime, anywhere.
        </Paragraph>
      </div>

      {/* Call-to-Action Section */}
      <div
        style={{
          padding: "40px",
          backgroundColor: "#0077cc",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Title level={3} style={{ color: "#fff" }}>
          Start Your Healthcare Journey Today
        </Title>
        <Paragraph style={{ fontSize: "16px" }}>
          Sign up now and take the first step toward better health.
        </Paragraph>
        <Button
          type="default"
          size="large"
          onClick={() => navigate("/register")}
          style={{ marginTop: "20px", color: "#0077cc", backgroundColor: "#fff" }}
        >
          Get Started
        </Button>
      </div>
    </Layout>
  );
};

export default HomePage;
