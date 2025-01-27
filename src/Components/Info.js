import React from "react";
import InformationCard from "./InformationCard";
import { faHeartPulse, faTruckMedical, faTooth } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Info.css";

function Info() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>What We Do</span>
        </h3>
        <p className="info-description">
        MedQPredict brings health assessments and disease predictions to your fingertips, 
        offering an AI-powered solution that helps you understand your risk for heart disease, 
        diabetes, stroke, and other serious conditions. Our app allows you to describe symptoms in plain language, 
        guiding you with tailored questions and immediate medical advice.
        </p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title="Symptom Analysis & Health Improvement Suggestions"
          description="Enter your symptoms in simple language, and our AI-powered engine predicts potential diseases and their severity.
          & Receive tailored advice on daily habits to improve your health, especially for non-critical conditions."
          icon={faTruckMedical}
        />

        <InformationCard
          title="Doctor Recommendations"
          description="Get a list of specialized doctors near you for the predicted diseases, ensuring you can access expert care."
          icon={faHeartPulse}
        />

        <InformationCard
          title="Localized Healthcare Insights"
          description="Assess your risk for diabetes and stroke based on your symptoms. 
          Get personalized feedback and recommendations on managing your health, ensuring timely intervention and prevention."
          icon={faTooth}
        />
      </div>
    </div>
  );
}

export default Info;
