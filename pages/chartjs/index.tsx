import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IndexPage = () => {
  return (
    <div>
      <h1>Cart.js</h1>
      <BarChart />
    </div>
  );
};

const BarChart = () => {
  const x = [1, 2, 3, 4, 5, 6, 7, 8];
  const y = [1, 2, 3, 4, 5, 6, 7, 8];
  const dataset = {
    labels: y,
    datasets: [
      {
        label: "Bar chart",
        data: x,
        backgroundColor: "#8c0ffa",
        borderRadius: 12,
        grid: false,
      },
    ],
  };

  return (
    <div style={{ height: "600px", width: "600px" }}>
      <Bar data={dataset} />
    </div>
  );
};

export default IndexPage;
