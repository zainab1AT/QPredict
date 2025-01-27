import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import '../Styles/Result.css';  

function ResultsPage() {
  const location = useLocation();
  const { symptoms, region } = location.state || {};

  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [chestPain, setChestPain] = useState("");
  const [fastingBloodSugar, setFastingBloodSugar] = useState("");
  const [maxHeartRate, setMaxHeartRate] = useState("");
  const [exerciseAngina, setExerciseAngina] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ age, sex, chestPain, fastingBloodSugar, maxHeartRate, exerciseAngina });
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
      <p>Based on your symptoms, we need more information. Please answer the following questions:</p>

      <form onSubmit={handleSubmit}>
        {/* Age */}
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

        {/* Sex */}
        <div>
          <label>What is your biological sex? (male/female):</label>
          <div>
            <label>
              <input
                type="radio"
                value="male"
                checked={sex === "male"}
                onChange={() => setSex("male")}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="female"
                checked={sex === "female"}
                onChange={() => setSex("female")}
                required
              />
              Female
            </label>
          </div>
        </div>

        {/* Chest Pain */}
        <div>
          <label>Have you experienced chest pain? If yes, how would you rate it on a scale of 0-3?</label>
          <div>
            <label>
              <input
                type="radio"
                value="0"
                checked={chestPain === "0"}
                onChange={() => setChestPain("0")}
                required
              />
              0: No chest pain
            </label>
            <label>
              <input
                type="radio"
                value="1"
                checked={chestPain === "1"}
                onChange={() => setChestPain("1")}
                required
              />
              1: Mild chest pain
            </label>
            <label>
              <input
                type="radio"
                value="2"
                checked={chestPain === "2"}
                onChange={() => setChestPain("2")}
                required
              />
              2: Moderate chest pain
            </label>
            <label>
              <input
                type="radio"
                value="3"
                checked={chestPain === "3"}
                onChange={() => setChestPain("3")}
                required
              />
              3: Severe chest pain
            </label>
          </div>
        </div>

        {/* Fasting Blood Sugar */}
        <div>
          <label>Is your fasting blood sugar greater than 120 mg/dL?</label>
          <div>
            <label>
              <input
                type="radio"
                value="yes"
                checked={fastingBloodSugar === "yes"}
                onChange={() => setFastingBloodSugar("yes")}
                required
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={fastingBloodSugar === "no"}
                onChange={() => setFastingBloodSugar("no")}
                required
              />
              No
            </label>
          </div>
        </div>

        {/* Maximum Heart Rate */}
        <div>
          <label>What is your maximum heart rate achieved during physical activity?</label>
          <input
            type="number"
            value={maxHeartRate}
            onChange={(e) => setMaxHeartRate(e.target.value)}
            placeholder="Enter your maximum heart rate"
            required
          />
        </div>

        {/* Exercise-induced Angina */}
        <div>
          <label>Have you experienced chest discomfort during exercise?</label>
          <div>
            <label>
              <input
                type="radio"
                value="yes"
                checked={exerciseAngina === "yes"}
                onChange={() => setExerciseAngina("yes")}
                required
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={exerciseAngina === "no"}
                onChange={() => setExerciseAngina("no")}
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
