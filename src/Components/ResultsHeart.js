import React, { useState } from "react";
import axios from "axios";
import "../Styles/Result.css";

function Heart({ region, symptoms }) {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [chestPain, setChestPain] = useState("");
  const [fastingBloodSugar, setFastingBloodSugar] = useState("");
  const [maxHeartRate, setMaxHeartRate] = useState("");
  const [exerciseAngina, setExerciseAngina] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    // Prepare the data for the API request
    const inputData = {
      age: parseInt(age, 10),
      sex: sex === "male" ? 1 : 0,
      cp: parseInt(chestPain, 10),
      fbs: fastingBloodSugar === "yes" ? 1 : 0,
      thalach: parseInt(maxHeartRate, 10),
      exang: exerciseAngina === "yes" ? 1 : 0,
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
    <h1>Heart Health Prediction</h1>
    <p>
        <strong>Region:</strong> {region}
    </p>
    <p>
        <strong>Symptoms:</strong> {symptoms}
    </p>

    <h2>Provide Your Details</h2>
    <form onSubmit={handleSubmit}>
        {/* Age */}
        <label>What is your Age?</label>

        <div>
            <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
                required
            />
        </div>

        {/* Sex */}
        <label>What is your biological sex?</label>

        <div className="question">
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

        {/* Chest Pain */}
        <label>Rate chest pain on a scale</label>

        <div className="question">
            <label>
                <input
                    type="radio"
                    value="0"
                    checked={chestPain === "0"}
                    onChange={() => setChestPain("0")}
                    required
                />
                No chest pain
            </label>
            <label>
                <input
                    type="radio"
                    value="1"
                    checked={chestPain === "1"}
                    onChange={() => setChestPain("1")}
                    required
                />
                Mild chest pain
            </label>
            <label>
                <input
                    type="radio"
                    value="2"
                    checked={chestPain === "2"}
                    onChange={() => setChestPain("2")}
                    required
                />
                Moderate chest pain
            </label>
            <label>
                <input
                    type="radio"
                    value="3"
                    checked={chestPain === "3"}
                    onChange={() => setChestPain("3")}
                    required
                />
                Severe chest pain
            </label>
        </div>

        {/* Fasting Blood Sugar */}
        <label>Is your fasting blood sugar greater than 120 mg/dL?</label>
        <div className="question">
           
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

        {/* Maximum Heart Rate */}
        <div>
            <label>Maximum heart rate during physical activity:</label>
            <input
                type="number"
                value={maxHeartRate}
                onChange={(e) => setMaxHeartRate(e.target.value)}
                placeholder="Enter your maximum heart rate"
                required
            />
        </div>

        {/* Exercise-induced Angina */}
        <label>Experienced chest discomfort during exercise?</label>

        <div className="question">
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

        <button type="submit" className="form-submit-btn">
            Submit
        </button>
    </form>

     {/* Display Result */}
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
        <span key={idx} className={idx === 1 ? "high-risk" : "low-risk"}>{idx === 1 ? "High Risk" : "Low Risk"} : {p.toFixed(2)} </span>
      ))}
    </p>
    
    {/* Display Advice Based on Prediction */}
    {result.prediction === 1 ? (
      <div >
        <p><strong>Advice:</strong> Based on your results, you are at high risk of heart disease. It is crucial to take immediate action to improve your heart health.</p>
        
        <h4>Steps to Take:</h4>
        <ul>
          <li><strong>Consult a healthcare provider:</strong> Schedule an appointment with your doctor for a comprehensive evaluation.</li>
          <li><strong>Adopt a healthy diet:</strong> Focus on a heart-healthy diet rich in fruits, vegetables, whole grains, and lean proteins. Limit unhealthy fats and sodium.</li>
          <li><strong>Exercise regularly:</strong> Aim for at least 30 minutes of moderate exercise most days of the week, such as walking, swimming, or cycling.</li>
          <li><strong>Manage stress:</strong> Practice relaxation techniques such as yoga, meditation, or deep breathing to manage stress.</li>
          <li><strong>Monitor cholesterol and blood pressure:</strong> Regularly check your cholesterol and blood pressure levels and follow your doctor's advice to manage them.</li>
        </ul>
      </div>
    ) : (
      <div>
        <p><strong>Advice:</strong> Your risk of heart disease is low, but it's important to continue maintaining a healthy lifestyle to keep it that way.</p>
        
        <h4>Tips to Maintain Good Heart Health:</h4>
        <ul>
          <li><strong>Eat a balanced diet:</strong> Include plenty of fruits, vegetables, whole grains, and healthy fats in your meals.</li>
          <li><strong>Stay active:</strong> Engage in regular physical activity to strengthen your heart and maintain a healthy weight.</li>
          <li><strong>Limit alcohol consumption:</strong> Drink alcohol in moderation, if at all.</li>
          <li><strong>Don't smoke:</strong> Avoid smoking and secondhand smoke exposure to reduce your risk of heart disease.</li>
          <li><strong>Get regular check-ups:</strong> Schedule annual check-ups to monitor your health and address any potential concerns early.</li>
        </ul>
      </div>
    )}
  </div>
)}

{/* Display Error */}
{error && <div className="error">Error: {error}</div>}

</div>

  );
}

export default Heart;
