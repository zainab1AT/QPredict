import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../Styles/Charts.css'

const DiseaseChart = () => {
  // Static data for diseases in Palestinian cities
  const data = {
    diabetes: [
      { city: 'Ramallah', cases: 100 },
      { city: 'Gaza', cases: 150 },
      { city: 'Hebron', cases: 80 },
      { city: 'Nablus', cases: 120 },
      { city: 'Bethlehem', cases: 60 },
    ],
    stroke: [
      { city: 'Ramallah', cases: 50 },
      { city: 'Gaza', cases: 70 },
      { city: 'Hebron', cases: 40 },
      { city: 'Nablus', cases: 60 },
      { city: 'Bethlehem', cases: 30 },
    ],
    heartDisease: [
      { city: 'Ramallah', cases: 90 },
      { city: 'Gaza', cases: 110 },
      { city: 'Hebron', cases: 70 },
      { city: 'Nablus', cases: 100 },
      { city: 'Bethlehem', cases: 50 },
    ],
  };

  // Chart rendering for a specific disease
  const renderChart = (data, diseaseName) => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="city" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="cases" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="disease-charts">
      <h2>Disease Spread in Palestinian Cities</h2>

      <div className="chart-container">
        <h3>Diabetes Cases</h3>
        {renderChart(data.diabetes, 'diabetes')}
      </div>

      <div className="chart-container">
        <h3>Stroke Cases</h3>
        {renderChart(data.stroke, 'stroke')}
      </div>

      <div className="chart-container">
        <h3>Heart Disease Cases</h3>
        {renderChart(data.heartDisease, 'heartDisease')}
      </div>
    </div>
  );
};

export default DiseaseChart;
