import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import * as faker from "faker";

const IndexPage = () => {
  return (
    <div>
      <h1>D3.js charts</h1>
      <hr />
      <UsersLikesInfo />
      <StarCoodinatesInfo />
    </div>
  );
};

export default IndexPage;

// *********************
// Bar Chart
// *********************

interface UserInfo {
  username: string;
  likes: number;
}

const UsersLikesInfo = () => {
  const [data, setData] = useState<UserInfo[]>([
    { username: faker.name.firstName(), likes: faker.datatype.number(100) },
    { username: faker.name.firstName(), likes: faker.datatype.number(100) },
    { username: faker.name.firstName(), likes: faker.datatype.number(100) },
    { username: faker.name.firstName(), likes: faker.datatype.number(100) },
    { username: faker.name.firstName(), likes: faker.datatype.number(100) },
    { username: faker.name.firstName(), likes: faker.datatype.number(100) },
    { username: faker.name.firstName(), likes: faker.datatype.number(100) },
  ]);
  const [reload, setReload] = useState(false);

  return (
    <div>
      <h2>Users likes info</h2>
      <BarChart data={data} reload={reload} />
      <button
        onClick={() => {
          setData([
            ...data,
            {
              username: faker.name.firstName(),
              likes: faker.datatype.number(100),
            },
          ]);
          setReload(true);
        }}
      >
        Add data
      </button>
      <button
        onClick={() => {
          let tmpData = [...data];
          tmpData.splice(-1);
          setData([...tmpData]);
          setReload(true);
        }}
      >
        Remove last sample
      </button>
    </div>
  );
};

const BarChart = ({ data, reload }: { data: UserInfo[]; reload: boolean }) => {
  // Chart container ref
  const ref = useRef();

  const [barChart, setBarChart] = useState(null);

  // Chart container
  const svgWidth = 800;
  const svgHeight = 600;

  // Spacing for chart
  const margin = { top: 20, right: 20, bottom: 100, left: 60 };
  const chartWidth = svgWidth - margin.left - margin.right;
  const chartHeight = svgHeight - margin.top - margin.bottom;

  // Create container
  useEffect(() => {
    d3.select(ref.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("border", "1px solid black");
  }, []);

  useEffect(() => {
    createChart();
  }, []);

  useEffect(() => {
    if (reload) {
      updateChart();
    }
  }, [data, reload]);

  const updateChart = () => {
    const svg = d3.select(ref.current);

    if (barChart) {
      barChart.remove();
      setBarChart(null);
    }

    // Initialize chart
    const chart = svg
      .append("g")
      .attr("class", "chart")
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .style("border", "1px solid black");

    setBarChart(chart);

    // Initialize each axis
    const xAxisGroup = chart
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${chartHeight})`);
    const yAxisGroup = chart.append("g").attr("class", "y-axis");

    // Scaling band for the x-axis
    const xScale = d3
      .scaleBand()
      .range([0, chartWidth])
      .paddingInner(0.2)
      .paddingOuter(0.2);

    // Linear scaling for the y-axis
    const yScale = d3.scaleLinear().range([chartHeight, 0]);

    // Scale the x-axis
    const xAxis = d3.axisBottom(xScale);

    // Adds a y labels
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(10)
      .tickFormat((d) => `${d}`);

    // Handle the scaling domains
    xScale.domain(data.map((item) => item.username));
    yScale.domain([0, d3.max(data, (d) => d.likes)]);

    const rects = chart.selectAll("rect").data(data);

    // Remove extra nodes from the DOM
    rects
      .exit()
      .transition()
      .duration(300)
      .attr("y", (d) => chartHeight)
      .attr("height", 0)
      .remove();

    // Initial chart scaling and styling for entries
    rects
      .attr("width", xScale.bandwidth)
      .attr("height", (d) => chartHeight - yScale(d.likes))
      .attr("x", (d) => xScale(d.username))
      .attr("y", (d) => yScale(d.likes))
      .style("fill", "yellowgreen");

    // chart scaling and styling for new entries
    rects
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.username))
      .attr("y", (d) => yScale(d.likes))
      .attr("width", xScale.bandwidth)
      // .transition()
      // .duration(300)
      .attr("height", (d) => chartHeight - yScale(d.likes))
      .style("fill", "yellowgreen"); // Bar color

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    // Handle the chart label styling
    xAxisGroup
      .selectAll("text")
      .attr("text-anchor", "end")
      .attr("fill", "grey")
      .attr("font-size", "20px")
      .attr("transform", "rotate(-40)")
      .attr("x", "-8");

    yAxisGroup
      .selectAll("text")
      .attr("text-anchor", "end")
      .attr("fill", "grey")
      .attr("font-size", "20px");

    //Remove extra nodes from the DOM
    svg.exit().remove();
  };

  const createChart = () => {
    const svg = d3.select(ref.current);

    // Initialize chart
    const chart = svg
      .append("g")
      .attr("class", "chart")
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .style("border", "1px solid black");

    setBarChart(chart);

    // Initialize each axis
    const xAxisGroup = chart
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${chartHeight})`);
    const yAxisGroup = chart.append("g").attr("class", "y-axis");

    // Scaling band for the x-axis
    const xScale = d3
      .scaleBand()
      .range([0, chartWidth])
      .paddingInner(0.2)
      .paddingOuter(0.2);

    // Linear scaling for the y-axis
    const yScale = d3.scaleLinear().range([chartHeight, 0]);

    // Scale the x-axis
    const xAxis = d3.axisBottom(xScale);

    // Adds a y labels
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(10)
      .tickFormat((d) => `${d}`);

    // Handle the scaling domains
    xScale.domain(data.map((item) => item.username));
    yScale.domain([0, d3.max(data, (d) => d.likes)]);

    const rects = chart.selectAll("rect").data(data);

    // Remove extra nodes from the DOM
    rects
      .exit()
      .transition()
      .duration(300)
      .attr("y", (d) => chartHeight)
      .attr("height", 0)
      .remove();

    // Initial chart scaling and styling for entries
    rects
      .attr("width", xScale.bandwidth)
      .attr("height", (d) => chartHeight - yScale(d.likes))
      .attr("x", (d) => xScale(d.username))
      .attr("y", (d) => yScale(d.likes))
      .style("fill", "yellowgreen");

    // chart scaling and styling for new entries
    rects
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.username))
      .attr("y", (d) => yScale(d.likes))
      .attr("width", xScale.bandwidth)
      .transition()
      .duration(300)
      .attr("height", (d) => chartHeight - yScale(d.likes))
      .style("fill", "yellowgreen"); // Bar color

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    // Handle the chart label styling
    xAxisGroup
      .selectAll("text")
      .attr("text-anchor", "end")
      .attr("fill", "grey")
      .attr("font-size", "20px")
      .attr("transform", "rotate(-40)")
      .attr("x", "-8");

    yAxisGroup
      .selectAll("text")
      .attr("text-anchor", "end")
      .attr("fill", "grey")
      .attr("font-size", "20px");

    //Remove extra nodes from the DOM
    svg.exit().remove();
  };

  return <svg ref={ref}></svg>;
};

// *********************
// Line Chart
// *********************

interface Coordinate {
  x: number;
  y: number;
}

const StarCoodinatesInfo = () => {
  const [xCount, setXCount] = useState(7);
  const [data, setData] = useState<Coordinate[]>([
    { x: 1, y: faker.datatype.number(100) },
    { x: 2, y: faker.datatype.number(100) },
    { x: 3, y: faker.datatype.number(100) },
    { x: 4, y: faker.datatype.number(100) },
    { x: 5, y: faker.datatype.number(100) },
    { x: 6, y: faker.datatype.number(100) },
    { x: 7, y: faker.datatype.number(100) },
  ]);
  const [reload, setReload] = useState(false);

  return (
    <div>
      <h2>Users likes info</h2>
      <LineChart data={data} reload={reload} />
      <button
        onClick={() => {
          setXCount((count) => count + 1);
          setData([
            ...data,
            {
              x: xCount,
              y: faker.datatype.number(1000),
            },
          ]);
          setReload(true);
        }}
      >
        Add data
      </button>
      <button
        onClick={() => {
          let tmpData = [...data];
          tmpData.splice(-1);
          setData([...tmpData]);
          setReload(true);
        }}
      >
        Remove last sample
      </button>
    </div>
  );
};

const LineChart = ({
  data,
  reload,
}: {
  data: Coordinate[];
  reload: boolean;
}) => {
  // Chart container ref
  const ref = useRef();

  const [lineChart, setLineChart] = useState(null);

  // Chart container
  const svgWidth = 800;
  const svgHeight = 600;

  // Spacing for chart
  const margin = { top: 20, right: 20, bottom: 100, left: 60 };
  const chartWidth = svgWidth - margin.left - margin.right;
  const chartHeight = svgHeight - margin.top - margin.bottom;

  // Create container
  useEffect(() => {
    d3.select(ref.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("border", "1px solid black");
  }, []);

  useEffect(() => {
    createChart();
  }, []);

  useEffect(() => {
    if (reload) {
      updateChart();
    }
  }, [data, reload]);

  const updateChart = () => {
    const svg = d3.select(ref.current);

    if (lineChart) {
      lineChart.remove();
      setLineChart(null);
    }

    // Initialize chart
    const chart = svg
      .append("g")
      .attr("class", "chart")
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .style("border", "1px solid black");

    setLineChart(chart);

    // Initialize each axis
    const xAxisGroup = chart
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${chartHeight})`);
    const yAxisGroup = chart.append("g").attr("class", "y-axis");

    // Linear scaling for the x and y axis and handle the scaling domains
    const xScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.x), d3.max(data, (d) => d.x)])
      .range([0, chartWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.y)])
      .range([chartHeight, 0]);

    // Scale the x-axis
    const xAxis = d3.axisBottom(xScale);

    // Adds a y labels
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(10)
      .tickFormat((d) => `${d}`);

    const line = d3
      .line()
      .x((d) => xScale((d as any).x))
      .y((d) => yScale((d as any).y))
      .curve(d3.curveMonotoneX);

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    // Handle the chart label styling
    xAxisGroup
      .selectAll("text")
      .attr("text-anchor", "end")
      .attr("fill", "grey")
      .attr("font-size", "20px")
      .attr("transform", "rotate(-40)")
      .attr("x", "-8");

    yAxisGroup
      .selectAll("text")
      .attr("text-anchor", "end")
      .attr("fill", "grey")
      .attr("font-size", "20px");

    // Adding line points
    chart
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "yellowgreen")
      .attr("stroke-width", 6)
      .attr("class", "line")
      .attr("d", line as any);

    //Remove extra nodes from the DOM
    svg.exit().remove();
  };

  const createChart = () => {
    const svg = d3.select(ref.current);

    // Initialize chart
    const chart = svg
      .append("g")
      .attr("class", "chart")
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .style("border", "1px solid black");

    setLineChart(chart);

    // Initialize each axis
    const xAxisGroup = chart
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${chartHeight})`);
    const yAxisGroup = chart.append("g").attr("class", "y-axis");

    // Linear scaling for the x and y axis and handle the scaling domains
    const xScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.x), d3.max(data, (d) => d.x)])
      .range([0, chartWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.y)])
      .range([chartHeight, 0]);

    // Scale the x-axis
    const xAxis = d3.axisBottom(xScale);

    // Adds a y labels
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(10)
      .tickFormat((d) => `${d}`);

    const line = d3
      .line()
      .x((d) => xScale((d as any).x))
      .y((d) => yScale((d as any).y))
      .curve(d3.curveMonotoneX);

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    // Handle the chart label styling
    xAxisGroup
      .selectAll("text")
      .attr("text-anchor", "end")
      .attr("fill", "grey")
      .attr("font-size", "20px")
      .attr("transform", "rotate(-40)")
      .attr("x", "-8");

    yAxisGroup
      .selectAll("text")
      .attr("text-anchor", "end")
      .attr("fill", "grey")
      .attr("font-size", "20px");

    // Adding line points
    chart
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "yellowgreen")
      .attr("stroke-width", 4)
      .attr("class", "line")
      .attr("d", line as any)
      .transition()
      .duration(300);

    //Remove extra nodes from the DOM
    svg.exit().remove();
  };

  return <svg ref={ref}></svg>;
};
