import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SymptomForm.css";
import { ToastContainer, toast } from "react-toastify";
import Stroke  from "./ResultsStroke";
import Heart from "./ResultsHeart";
import Diabetes from "./ResultsDiabetes";

function SymptomForm() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const navigate = useNavigate();

  const [symptoms, setSymptoms] = useState("");
  const [region, setRegion] = useState("default");
  const [formErrors, setFormErrors] = useState({});
  const [prediction, setPrediction] = useState(null); // State to store predicted condition

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    const errors = {};
    if (!symptoms.trim()) {
      errors.symptoms = "Please describe your symptoms.";
    }
    if (region === "default") {
      errors.region = "Please select your region.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    toast.info("Analyzing symptoms...", { position: "top-center" });

    // Simple rule-based logic for prediction
    let predictedCondition = null;
    if (symptoms.includes("chest pain") || symptoms.includes("shortness of breath")) {
      predictedCondition = "heartDisease";
    } else if (symptoms.includes("numbness") || symptoms.includes("speech difficulty")) {
      predictedCondition = "stroke";
    } else if (symptoms.includes("excessive thirst") || symptoms.includes("frequent urination")) {
      predictedCondition = "diabetes";
    } else {
      toast.warning("Unable to classify symptoms. Please consult a doctor.", {
        position: "top-center",
      });
      return;
    }

    setPrediction(predictedCondition);
    toast.success("Analysis complete!", { position: "top-center" });
  };

  const renderResults = () => {
    switch (prediction) {
      case "heartDisease":
        return <Heart region={region} symptoms={symptoms} />;
      case "stroke":
        return <Stroke region={region} symptoms={symptoms} />;
      case "diabetes":
        return <Diabetes region={region} symptoms={symptoms} />;
      default:
        return null;
    }
  };

  return (
    <div className="symptom-form-section">
      <div className="form-container">
        <h2 className="form-title">
          <span>Enter Symptoms for Analysis</span>
        </h2>

        <form className="form-content" onSubmit={handleSubmit}>
          <label>
            Describe Your Symptoms:
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Enter your symptoms here..."
              required
            ></textarea>
            {formErrors.symptoms && <p className="error-message">{formErrors.symptoms}</p>}
          </label>

          <br />

          <label>
            Select Your Region:
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            >
              <option value="default">Select your region</option>
              <option value="Gaza">Gaza</option>
              <option value="Hebron">Hebron</option>
              <option value="Bethlehem">Bethlehem</option>
              <option value="Ramallah">Ramallah</option>
              <option value="Qalqilya">Qalqilya</option>
              <option value="Jenin">Jenin</option>
            </select>
            {formErrors.region && <p className="error-message">{formErrors.region}</p>}
          </label>

          <br />

          <button type="submit" className="form-submit-btn">
            Submit Symptoms
          </button>
        </form>
      </div>

      {renderResults()}

      <ToastContainer autoClose={5000} limit={1} closeButton={false} />
    </div>
  );
}

export default SymptomForm;
