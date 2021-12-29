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
        <li>{linkJsx("D3", "/d3")}</li>
      </ul>
    </div>
  );
};

export default HomePage;
