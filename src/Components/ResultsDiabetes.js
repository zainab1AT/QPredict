import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import '../Styles/Result.css';  

// import "../Styles/Symp.css"

function Diabetes({ symptoms, region }) {
  // const location = useLocation();
  // const { symptoms, region } = location.state || {};

  const [pregnancies, setPregnancies] = useState("");
  const [glucose, setGlucose] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [diabetesPedigree, setDiabetesPedigree] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Collect input data
    const inputData = {
      Pregnancies: parseFloat(pregnancies),
      Glucose: parseFloat(glucose),
      BloodPressure: parseFloat(bloodPressure),
      BMI: parseFloat(weight / (height ** 2)), // Calculating BMI
      DiabetesPedigreeFunction: parseFloat(diabetesPedigree),
      Age: parseInt(age),
    };
  
    try {
      // Send data to Flask backend
      const response = await axios.post("http://localhost:5000/predict", inputData);
      setResult(response.data);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to connect to the server. Please try again.");
    }
  };
  

  return (
    <div className="results-section">
      <h1>Diabetes Symptom Analysis </h1>
      <p>
        <strong>Symptoms:</strong> {symptoms}
      </p>
      <p>
        <strong>Region:</strong> {region}
      </p>
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
    
    {/* Display Diabetes Advice Based on Prediction */}
    {result.prediction === 1 ? (
      <div>
        <p><strong>Advice:</strong> Based on your results, you are at high risk of diabetes. It is essential to take action immediately to prevent or manage the condition.</p>
        
        <h4>Steps to Take:</h4>
        <ul>
          <li><strong>Consult a healthcare provider:</strong> Schedule a visit to your doctor or endocrinologist for further testing and personalized advice.</li>
          <li><strong>Adopt a balanced diet:</strong> Focus on low-glycemic foods like whole grains, fruits, and vegetables. Avoid sugary foods and drinks.</li>
          <li><strong>Exercise regularly:</strong> Aim for at least 30 minutes of physical activity most days of the week to improve insulin sensitivity.</li>
          <li><strong>Monitor blood sugar levels:</strong> Regularly check your blood sugar levels to manage them effectively.</li>
          <li><strong>Lose weight:</strong> If overweight, losing even a small percentage of your body weight can significantly reduce your diabetes risk.</li>
        </ul>
      </div>
    ) : (
      <div>
        <p><strong>Advice:</strong> Your risk of diabetes is low, but it’s still important to maintain a healthy lifestyle to keep it that way.</p>
        
        <h4>Tips to Maintain Good Health:</h4>
        <ul>
          <li><strong>Eat a healthy diet:</strong> Include plenty of vegetables, whole grains, lean proteins, and healthy fats in your meals.</li>
          <li><strong>Stay physically active:</strong> Regular exercise helps maintain healthy blood sugar levels and overall health.</li>
          <li><strong>Maintain a healthy weight:</strong> Aim for a healthy weight by balancing calorie intake with physical activity.</li>
          <li><strong>Limit alcohol consumption:</strong> Drink in moderation or avoid alcohol to keep your blood sugar levels stable.</li>
          <li><strong>Get regular check-ups:</strong> Visit your doctor for routine check-ups and monitor blood sugar and other health metrics regularly.</li>
        </ul>
      </div>
    )}
  </div>
)}


    </div>
  );
}

export default Diabetes;
