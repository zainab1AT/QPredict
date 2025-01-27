import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SymptomForm.css";
import { ToastContainer, toast } from "react-toastify";

function SymptomForm() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const navigate = useNavigate();

  const [symptoms, setSymptoms] = useState("");
  const [region, setRegion] = useState("default");
  const [formErrors, setFormErrors] = useState({});

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
    toast.success("Symptoms submitted successfully!", {
      position: "top-center",
    });

    navigate("/results", { state: { symptoms, region } });
  };

  return (
    <div className="symptom-form-section">
      <h1 className="site-title">MedQPredict</h1>

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
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="central">Central</option>
              <option value="east">East</option>
              <option value="west">West</option>
            </select>
            {formErrors.region && <p className="error-message">{formErrors.region}</p>}
          </label>

          <br />

          <button type="submit" className="form-submit-btn">
            Submit Symptoms
          </button>
        </form>
      </div>

      <div className="footer">
        <p>© 2025 MedQPredict. All rights reserved.</p>
      </div>

      <ToastContainer autoClose={5000} limit={1} closeButton={false} />
    </div>
  );
}

export default SymptomForm;
