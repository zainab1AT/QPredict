import React from "react";
import Doctor from "../Assets/doctor-group.png";
import SolutionStep from "./SolutionStep";
import "../Styles/About.css";

function About() {
  return (
    <div className="about-section" id="about">
      <div className="about-image-content">
        <img src={Doctor} alt="Doctor Group" className="about-image1" />
      </div>

      <div className="about-text-content">
        <h3 className="about-title">
          <span>About QPredict</span>
        </h3>
        <p className="about-description">
        QPredict was created to empower individuals with accurate, AI-driven health predictions. Our mission is to simplify healthcare by providing users with clear, actionable insights into their health risks, helping them take proactive steps for better well-being.
        We use advanced technology, including AI and quantum computing, to analyze symptoms and predict diseases quickly and accurately. By connecting users to specialized doctors in their area, we bridge the gap between diagnosis and expert care."
        </p>

        <h4 className="about-text-title">How It Works</h4>

        <SolutionStep
          title="Describe Your Symptoms"
          description="  Describe your symptoms in simple language, and MedQPredict uses AI to assess your health risks."
        />

        <SolutionStep
          title="Receive Tailored Questions"
          description="  Our AI uses Natural Language Processing (NLP) to ask follow-up questions, ensuring a personalized health risk assessment for conditions like heart disease, diabetes, and stroke."
        />

        <SolutionStep
          title="Get Predictions & take proactive steps for better well-being."
          description="  Based on your symptoms, MedQPredict offers disease predictions, first aid tips, and immediate actions to help manage your health."
        />

        <h4 className="about-text-title">Why QPredict?</h4>
        <p className="about-description">
        In areas with limited healthcare access, MedQPredict combines AI and quantum computing to provide fast,
         accurate health predictions. This app helps detect health risks early and empowers users with actionable steps 
         for managing their health, even when medical care is not immediately available.
        </p>
      </div>
    </div>
  );
}

export default About;
