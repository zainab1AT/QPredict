from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# Load the data and train the model
csv_file2 = "../datasets/diabetes.csv"
data = pd.read_csv(csv_file2)
x = data.drop(columns=['Outcome', 'SkinThickness', 'Insulin'])
y = data['Outcome']
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=0)
rfc = RandomForestClassifier()
rfc.fit(x_train, y_train)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        input_data = request.json
        # Convert input data to DataFrame
        features = pd.DataFrame([input_data])
        # Ensure feature order matches training data
        features = features[x.columns]
        # Make prediction
        prediction = rfc.predict(features)
        probability = rfc.predict_proba(features)
        # Return result
        return jsonify({
            'prediction': int(prediction[0]),
            'probability': probability[0].tolist()
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
