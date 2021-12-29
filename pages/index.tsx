import Link from "next/link";

const HomePage = () => {
  const linkJsx = (text: string, href: string) => (
    <Link href={href}>
      <a>{text}</a>
    </Link>
  );

  return (
    <div>
      <h1>Data Visualizations</h1>
      <ul>
        <li>{linkJsx("D3.js", "/d3js")}</li>
        <li>{linkJsx("Chart.js", "/chartjs")}</li>
      </ul>
    </div>
  );
};

export default HomePage;
