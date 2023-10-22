"use client";

import { Skills } from "@/app/types/UserAnalysis";
import styles from "./Chart.module.css";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const LABELS: Record<keyof Skills, string> = {
  leadership: "Liderazgo",
  innovation: "Innovación",
  enterpreneurship: "Emprendimiento",
  teamwork: "Trabajo en equipo",
  goodPerson: "Buena persona",
  commitment: "Compromiso",
  resilience: "Resilencia",
};

interface ChartDetails {
  values: number[];
  labels: string[];
}

export default function StatCharts({ skills }: { skills: Skills }) {
  const { values, labels } = Object.entries(skills).reduce<ChartDetails>(
    (acc, [skill, value]: [string, number]) => {
      return {
        values: [...acc.values, value],
        labels: [...acc.labels, LABELS[skill as keyof Skills]],
      };
    },
    { values: [], labels: [] }
  );

  const data: ChartData<"radar"> = {
    labels: labels,
    datasets: [
      {
        label: "Puntuación",
        data: values,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.sizes}>
      <Radar
        data={data}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            r: {
              angleLines: {
                display: false,
              },
              suggestedMin: 0,
              suggestedMax: 10,
              pointLabels: {},
              ticks: {
                display: false,
              },
            },
          },
        }}
      />
    </div>
  );
}
