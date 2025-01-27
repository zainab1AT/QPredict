import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import '../Styles/Result.css';  

function ResultsPage() {
  const location = useLocation();
  const { symptoms, region } = location.state || {};

  const [pregnancies, setPregnancies] = useState("");
  const [glucose, setGlucose] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [diabetesPedigree, setDiabetesPedigree] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      pregnancies,
      glucose,
      bloodPressure,
      weight,
      height,
      diabetesPedigree,
      age,
    });
  };

  return (
    <div className="results-section">
      <h1>Symptom Analysis Results</h1>
      <p>
        <strong>Symptoms:</strong> {symptoms}
      </p>
      <p>
        <strong>Region:</strong> {region}
      </p>
      <h2>Next Steps</h2>
      <br/>
      <p>Based on your symptoms, we need more information. Please answer the following questions:</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>How many times have you been pregnant? (Enter 0 if not applicable):</label>
          <input
            type="number"
            value={pregnancies}
            onChange={(e) => setPregnancies(e.target.value)}
            placeholder="Enter number of pregnancies"
            required
          />
        </div>

        <div>
          <label>What is your blood glucose level? (e.g., 120 mg/dL):</label>
          <input
            type="text"
            value={glucose}
            onChange={(e) => setGlucose(e.target.value)}
            placeholder="Enter your blood glucose level"
            required
          />
        </div>

        <div>
          <label>What is your blood pressure? (e.g., 80 mmHg):</label>
          <input
            type="text"
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
            placeholder="Enter your blood pressure"
            required
          />
        </div>

        <div>
          <label>What is your weight? (in kilograms):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight"
            required
          />
        </div>

        <div>
          <label>What is your height? (in meters):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height"
            required
          />
        </div>

        <div>
          <label>What is your diabetes pedigree function value? (if known):</label>
          <input
            type="text"
            value={diabetesPedigree}
            onChange={(e) => setDiabetesPedigree(e.target.value)}
            placeholder="Enter your diabetes pedigree function"
            required
          />
        </div>

        <div>
          <label>What is your age?</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            required
          />
        </div>

        <button type="submit" className="form-submit-btn">
          Submit Answers
        </button>
      </form>
    </div>
  );
}

export default ResultsPage;
