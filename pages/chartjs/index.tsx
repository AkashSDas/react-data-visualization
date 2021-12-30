import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import * as faker from "faker";
import { useEffect, useState } from "react";

// Register chart js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const IndexPage = () => {
  return (
    <div>
      <h1>Cart.js</h1>
      <BarChart />
      <LineChart />
    </div>
  );
};

// *****************
// Bar Chart
// *****************

const BarChart = () => {
  const [xCount, setXCount] = useState(10);
  const [data, setData] = useState({
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [
      faker.datatype.number(100),
      faker.datatype.number(100),
      faker.datatype.number(100),
      faker.datatype.number(100),
      faker.datatype.number(100),
      faker.datatype.number(100),
      faker.datatype.number(100),
      faker.datatype.number(100),
      faker.datatype.number(100),
      faker.datatype.number(100),
      faker.datatype.number(100),
    ],
  });

  const [dataset, setDataset] = useState({
    labels: data.x,
    datasets: [
      {
        label: "Bar chart",
        data: data.y,
        backgroundColor: "#8c0ffa",
        borderRadius: 12,
      },
    ],
  });

  useEffect(() => {
    setDataset({
      labels: data.x,
      datasets: [
        {
          label: "Bar chart",
          data: data.y,
          backgroundColor: "#8c0ffa",
          borderRadius: 12,
        },
      ],
    });
  }, [data.x, data.y]);

  return (
    <div style={{ height: "600px", width: "600px" }}>
      <Bar data={dataset} options={{ animation: { duration: 300 } }} redraw />
      <button
        onClick={() => {
          setXCount((count) => count + 1);
          setData({
            x: [...data.x, xCount],
            y: [...data.y, faker.datatype.number(100)],
          });
        }}
      >
        Add data
      </button>
      <button
        onClick={() => {
          setXCount((count) => count - 1);
          let tmpX = [...data.x];
          tmpX.splice(-1);
          let tmpY = [...data.y];
          tmpY.splice(-1);
          setData({
            x: [...tmpX],
            y: [...tmpY],
          });
        }}
      >
        Remove last sample
      </button>
    </div>
  );
};

// *****************
// Line Chart
// *****************

const LineChart = () => {
  const [xCount, setXCount] = useState(10);
  const [data, setData] = useState({
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [
      faker.datatype.number(100),
      faker.datatype.number(100),
      faker.datatype.number(100),
      faker.datatype.number(100),
      faker.datatype.number(100),
      faker.datatype.number(100),
      faker.datatype.number(100),
      faker.datatype.number(100),
      faker.datatype.number(100),
      faker.datatype.number(100),
      faker.datatype.number(100),
    ],
  });

  const [dataset, setDataset] = useState({
    labels: data.x,
    datasets: [
      {
        label: "Bar chart",
        data: data.y,
        backgroundColor: "#8c0ffa",
        borderRadius: 12,
      },
    ],
  });

  useEffect(() => {
    setDataset({
      labels: data.x,
      datasets: [
        {
          label: "Bar chart",
          data: data.y,
          backgroundColor: "#8c0ffa",
          borderRadius: 12,
        },
      ],
    });
  }, [data.x, data.y]);

  return (
    <div style={{ height: "600px", width: "600px" }}>
      <Line data={dataset} options={{ animation: { duration: 300 } }} redraw />
      <button
        onClick={() => {
          setXCount((count) => count + 1);
          setData({
            x: [...data.x, xCount],
            y: [...data.y, faker.datatype.number(100)],
          });
        }}
      >
        Add data
      </button>
      <button
        onClick={() => {
          setXCount((count) => count - 1);
          let tmpX = [...data.x];
          tmpX.splice(-1);
          let tmpY = [...data.y];
          tmpY.splice(-1);
          setData({
            x: [...tmpX],
            y: [...tmpY],
          });
        }}
      >
        Remove last sample
      </button>
    </div>
  );
};

export default IndexPage;
