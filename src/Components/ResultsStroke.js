import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import '../Styles/Result.css';  

function Stroke( { symptoms, region } ) {
  const location = useLocation();
  // const { symptoms, region } = location.state || {};

  const [age, setAge] = useState("");
  const [heartDisease, setHeartDisease] = useState("");
  const [glucoseLevel, setGlucoseLevel] = useState("");
  const [hypertension, setHypertension] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
  
    const inputData = {
      age: parseFloat(age), // Ensure numeric inputs are correctly parsed
      heart_disease: heartDisease === "yes" ? 1 : 0,
      avg_glucose_level: parseFloat(glucoseLevel),
      hypertension: hypertension === "yes" ? 1 : 0,
    };
  
    try {
      console.log(inputData)
      const response = await axios.post("http://localhost:5000/predict", inputData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while predicting.");
    }
  };
  

  return (
    <div className="results-section">
      <h1>Stroke Symptom Analysis</h1>
      <p>
        <strong>Symptoms:</strong> {symptoms}
      </p>
      <p>
        <strong>Region:</strong> {region}
      </p>
      <br/>
      <p>Based on your symptoms, we need more information. Please answer the following questions:</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>What is your Age?</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            required
          />
        </div>
        <label>Have you been diagnosed with heart disease?</label>
        <div className="question"> 
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

        <div>
          <label>What is your average glucose level? </label>
          <input
            type="text"
            value={glucoseLevel}
            onChange={(e) => setGlucoseLevel(e.target.value)}
            placeholder="Enter your average glucose level (e.g., 85.6 mg/dL)"
            required
          />
        </div>

        <label>Do you have hypertension?</label>
        <div className="question"> 
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

        <button type="submit" className="form-submit-btn">
          Submit Answers
        </button>
      </form>


      
      {result && (
  <div className="result">
    <h3>Prediction Result:</h3>
    <p>
      <strong>Prediction:</strong>
      <span className={result.prediction === 1 ? "high-risk" : "low-risk"}>
        {result.prediction === 1 ? "High Risk" : "Low Risk"}
      </span>
    </p>

    <p>
      <strong>Probability:</strong> {result.probability.map((p, idx) => (
        <span key={idx} className={idx === 1 ? "high-risk" : "low-risk"}>
          {idx === 1 ? "High Risk" : "Low Risk"} : {p.toFixed(2)}
        </span>
      ))}
    </p>
    
    {/* Display Stroke Advice Based on Prediction */}
    {result.prediction === 1 ? (
      <div>
        <p><strong>Advice:</strong> Based on your results, you are at high risk of having a stroke. Immediate action is required to manage and reduce your risk.</p>
        
        <h4>Steps to Take:</h4>
        <ul>
          <li><strong>Consult a healthcare provider:</strong> It's important to schedule an appointment with your doctor or neurologist for further evaluation and preventive measures.</li>
          <li><strong>Control high blood pressure:</strong> Hypertension is a major stroke risk factor. Take steps to manage your blood pressure with medication, if prescribed, and lifestyle changes.</li>
          <li><strong>Adopt a heart-healthy diet:</strong> Focus on foods low in saturated fats and high in fiber. Include fruits, vegetables, whole grains, and lean proteins in your meals.</li>
          <li><strong>Exercise regularly:</strong> Aim for at least 30 minutes of moderate exercise most days of the week, which can improve cardiovascular health and reduce stroke risk.</li>
          <li><strong>Stop smoking:</strong> Smoking significantly increases stroke risk. Quitting smoking will help lower your risk of a stroke.</li>
        </ul>
      </div>
    ) : (
      <div>
        <p><strong>Advice:</strong> Your risk of stroke is low, but it is still essential to maintain a healthy lifestyle to keep it that way.</p>
        
        <h4>Tips to Maintain Good Health:</h4>
        <ul>
          <li><strong>Keep blood pressure in check:</strong> Even with a low stroke risk, it’s important to keep your blood pressure within a healthy range.</li>
          <li><strong>Eat a balanced diet:</strong> Continue consuming a diet rich in fruits, vegetables, whole grains, and healthy fats.</li>
          <li><strong>Stay physically active:</strong> Regular exercise promotes heart health and helps keep blood pressure and weight under control.</li>
          <li><strong>Limit alcohol consumption:</strong> Drinking alcohol in moderation helps prevent high blood pressure, which can lead to a stroke.</li>
          <li><strong>Don't smoke:</strong> Avoid smoking and secondhand smoke to protect your heart and brain health.</li>
        </ul>
      </div>
    )}
  </div>
)}


    </div>

    
  );
}

export default Stroke;
