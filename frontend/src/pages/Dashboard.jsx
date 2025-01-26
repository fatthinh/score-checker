import SingleSelect from "../components/SingleSelect";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useAxios } from "../hooks/useAxios";
import { REVERSED_SCORE_LABELS, SCORE_LABELS } from "../utils/contants";
import { LoadingIcon } from "../components/Icons";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "< 4 points",
  "6 points > && >= 4 points",
  "8 points > && >=6 points",
  ">=8 points",
];

function Dashboard() {
  const [subject, setSubject] = useState("toan");
  const { response, loading } = useAxios(
    {
      url: "statistic?subject=" + subject,
      method: "GET",
    },
    subject
  );

  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "quantity",
        data: [0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 100, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 100, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Score chart by " + SCORE_LABELS[subject],
      },
    },
  };

  useEffect(() => {
    if (response) {
      setData((prev) => {
        return {
          ...prev,
          datasets: [
            {
              ...prev.datasets[0],
              data: Object.values(response).map((item) => item),
            },
          ],
        };
      });
    }
  }, [response]);

  return (
    <div>
      <div className="ml-auto md:w-1/5">
        <SingleSelect
          label="Subject"
          options={Object.values(SCORE_LABELS).map((item) => item)}
          onChange={(val) => setSubject(REVERSED_SCORE_LABELS[val])}
        />
      </div>
      {loading ? (
        <div className="w-full flex p-12 justify-center">
          <LoadingIcon className="w-10 h-10" />
        </div>
      ) : (
        <div className="flex justify-center ">
          <div className="md:w-2/3">
            <Bar options={options} data={data} classsName="" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
