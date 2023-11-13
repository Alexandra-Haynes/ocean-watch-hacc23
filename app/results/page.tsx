"use client";
import { useEffect, useState } from "react";
import {
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Text,
  Tooltip,
} from "recharts";
import Navbar from "../components/Navbar";

interface RemovalJobs {
  id: string;
  location: string;
  date: string;
  debrisType: string;
  containerStatus: string;
  biofouling: string;
  description: string;
  island: string;
  email: string;
  phone: string;
  captcha: string;
  status: string;
}

interface DebrisTypeSummary {
  name: string;
  value: number;
}

const colors = [
  "#006d77", // rich blue-green
  "#83c5be", // soft blue-green
  "#edf6f9", // very light blue-green
  "#ffddd2", // light coral for contrast
  "#3a86ff", // vibrant blue
  "#00b4d8", // bright cyan
  "#0077b6", // strong blue
  "#0096c7", // deep sky blue
  "#48cae4", // bright blue-green
  "#90e0ef", // light blue-green
  "#ade8f4", // pale blue-green
  "#caf0f8", // very pale blue
];

export default function ResultsPage() {
  const [jobs, setJobs] = useState<RemovalJobs[]>([]);

  function transformRemovalJobsData(jobs: RemovalJobs[]): DebrisTypeSummary[] {
    return jobs.reduce((acc: DebrisTypeSummary[], job: RemovalJobs) => {
      // // Find if the debrisType already exists in the accumulator
      // const existingType = acc.find(item => item.name === job.debrisType);

      // if (existingType) {
      //   // If found, increase the count
      //   existingType.value += 1;
      // } else {
      //   // If not found, add a new entry with a count of 1
      //   acc.push({ name: job.debrisType, value: 1 });
      // }

      const counts = jobs.reduce(
        (acc: Record<string, number>, job: RemovalJobs) => {
          acc[job.debrisType] = (acc[job.debrisType] || 0) + 1;
          return acc;
        },
        {},
      );

      // Then, calculate the percentages
      const total = jobs.length;
      return Object.keys(counts).map((debrisType) => ({
        name: debrisType,
        value: parseFloat(((counts[debrisType] / total) * 100).toFixed(2)), // Convert to percentage
      }));
    }, []);
  }

  const calculateFishingGearPercentage = (data: RemovalJobs[]) => {
    const totalCount = data.length;
    const fishingGearCount = data.filter(
      (job) => job.debrisType === "A mass of netting and/or fishing gear",
    ).length;
    const fishingGearPercentage = parseFloat(
      ((fishingGearCount / totalCount) * 100).toFixed(2),
    );
    const otherPercentage = parseFloat(
      (100 - fishingGearPercentage).toFixed(2),
    );

    return [
      {
        name: "Fishing Gear",
        value: fishingGearPercentage,
      },
      {
        name: "Other",
        value: otherPercentage,
      },
    ];
  };

  const getRemovalJobs = async () => {
    try {
      const response = await fetch("/api/report", {
        method: "GET",
      });
      const data = await response.json();
      setJobs(data);

      if (response.ok) {
        // Success - display success message, next steps, etc.
        console.log("SUCCESS");
      } else {
        // Handle errors, display an error message
      }
    } catch (error) {
      // Handle network/server errors
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    getRemovalJobs();
  }, []);

  const debrisPercentageData = transformRemovalJobsData(jobs);
  const fishingGearPercentageData = calculateFishingGearPercentage(jobs);

  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10">
      <Navbar />
      <h1 className="text-white self-center">Results Page</h1>
      <div className="flex justify-around">
        <div className="flex flex-col w-1/3">
          <h2 className="text-white justify-center m-auto">% Debris Type</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Tooltip />
              <Legend layout="vertical" verticalAlign="bottom" align="center" />
              <Pie
                data={debrisPercentageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {debrisPercentageData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index] ?? "#8884d8"}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col w-1/3">
          <h2 className="text-white justify-center m-auto">
            % Fishing Gear vs Other
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Tooltip />
              <Legend layout="vertical" verticalAlign="bottom" align="center" />
              <Pie
                data={fishingGearPercentageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {debrisPercentageData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index] ?? "#8884d8"}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
