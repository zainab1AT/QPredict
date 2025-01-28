from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.impute import KNNImputer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from imblearn.over_sampling import SMOTE

# Load the dataset
csv_file = "../datasets/healthcare-dataset-stroke-data.csv"
df = pd.read_csv(csv_file)

# Preprocess the data
df.drop("id", axis=1, inplace=True)
df = df[df['gender'] != 'Other']

# Map categorical columns (define mappings if necessary)
mappings = {
    "gender": {"Male": 0, "Female": 1},
    "ever_married": {"No": 0, "Yes": 1},
    "work_type": {"children": 0, "Govt_job": 1, "Never_worked": 2, "Private": 3, "Self-employed": 4},
    "Residence_type": {"Rural": 0, "Urban": 1},
    "smoking_status": {"never smoked": 0, "formerly smoked": 1, "smokes": 2, "Unknown": 3},
}
for col in mappings.keys():
    if col in df.columns:
        df[col] = df[col].map(mappings[col])

# Impute missing BMI values
imputer = KNNImputer(n_neighbors=3)
df["bmi"] = imputer.fit_transform(df[["bmi"]])

# Prepare data for model training
X = df.drop("stroke", axis=1)
y = df["stroke"]

selected_features = ["age", "heart_disease", "avg_glucose_level", "hypertension"]
X = X[selected_features]

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=0.8, random_state=0)

# Apply SMOTE to handle class imbalance
oversample = SMOTE(random_state=0)
X_train_ns, y_train_ns = oversample.fit_resample(X_train, y_train)

# Train Logistic Regression model with SMOTE
model = LogisticRegression(C=0.01, max_iter=1000)
model.fit(X_train_ns, y_train_ns)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from request
        input_data = request.json
        # Convert input data to DataFrame
        features = pd.DataFrame([input_data])
        # Ensure features match selected columns
        features = features[selected_features]
        # Make prediction
        prediction = model.predict(features)
        probability = model.predict_proba(features)
        return jsonify({
            'prediction': int(prediction[0]),
            'probability': probability[0].tolist()
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
