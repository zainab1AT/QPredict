import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import '../Styles/Result.css';  

function ResultsPage() {
  const location = useLocation();
  const { symptoms, region } = location.state || {};

  const [age, setAge] = useState("");
  const [heartDisease, setHeartDisease] = useState("");
  const [glucoseLevel, setGlucoseLevel] = useState("");
  const [hypertension, setHypertension] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ age, heartDisease, glucoseLevel, hypertension });
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
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            required
          />
        </div>

        <div>
          <label>Have you been diagnosed with heart disease?</label>
          <div>
            <label>
              <input
                type="radio"
                value="yes"
                checked={heartDisease === "yes"}
                onChange={() => setHeartDisease("yes")}
                required
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={heartDisease === "no"}
                onChange={() => setHeartDisease("no")}
                required
              />
              No
            </label>
          </div>
        </div>

        <div>
          <label>What is your average glucose level? (e.g., 85.6 mg/dL)</label>
          <input
            type="text"
            value={glucoseLevel}
            onChange={(e) => setGlucoseLevel(e.target.value)}
            placeholder="Enter your average glucose level"
            required
          />
        </div>

        <div>
          <label>Do you have hypertension?</label>
          <div>
            <label>
              <input
                type="radio"
                value="yes"
                checked={hypertension === "yes"}
                onChange={() => setHypertension("yes")}
                required
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={hypertension === "no"}
                onChange={() => setHypertension("no")}
                required
              />
              No
            </label>
          </div>
        </div>

        <button type="submit" className="form-submit-btn">
          Submit Answers
        </button>
      </form>
    </div>
  );
}

export default ResultsPage;
