import type { GetServerSideProps } from 'next';
import type { FunctionComponent } from 'react';

type HomeProps = {
  count: number;
};

const Home: FunctionComponent<HomeProps> = (props) => {
  return <h1 className="text-violet-200 text-2xl">{props.count}</h1>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/pools/count');
  const data = await response.json();

  return {
    props: {
      count: data.count,
    },
  };
};

export default Home;
