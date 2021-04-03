import { useParams } from 'react-router';

const Player = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <h1>Hello from Player</h1>
      <h2>{id}</h2>
    </>
  );
};

export default Player;
