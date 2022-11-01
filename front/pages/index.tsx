interface HomeProps {
  count: number;
}

export default function Home(props: HomeProps) {
  return (
    <div>
      <h1>Constagem: {props.count} </h1>
    </div>
  );
}

export const getServerSidePorops = async () => {
  const res = await fetch('http://localhost:3333/pools/count');
  const data = await res.json();

  console.log(data);

  return {
    props: {
      count: data.count
    }
  };
};
