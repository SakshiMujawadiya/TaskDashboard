import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const TraineeBarChart = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Trainee Progress Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#4b5563", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: "#4b5563", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #d1d5db" }}
            labelStyle={{ fontWeight: "bold" }}
          />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="completed" fill="#22c55e" name="Completed" radius={[4, 4, 0, 0]} />
          <Bar dataKey="pending" fill="#f97316" name="Pending" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TraineeBarChart;
