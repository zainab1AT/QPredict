from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# Load the dataset
csv_file2 = "../datasets/heart.csv"
df2 = pd.read_csv(csv_file2)


features2 = ['age', 'sex', 'cp', 'fbs', 'thalach', 'exang']
X = df2[features2]
y = df2['target']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

rfc = RandomForestClassifier(n_estimators=100, max_depth=10, min_samples_split=20, min_samples_leaf=5, random_state=42)
rfc.fit(X_train, y_train)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input data from the request
        input_data = request.json
        print(input_data)
        # Convert input data to a DataFrame
        features = pd.DataFrame([input_data])
        # Ensure the features match training data columns
        features = features[['age', 'sex', 'cp', 'fbs', 'thalach', 'exang']] 
        # Scale the input features
        scaler = StandardScaler().fit(X_train)
        features_scaled = scaler.transform(features)
        # Make prediction
        prediction = rfc.predict(features_scaled)
        probability = rfc.predict_proba(features_scaled)
        print(features)
        # Return the prediction and probability
        return jsonify({
            'prediction': int(prediction[0]),
            'probability': probability[0].tolist()
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
