import { useAppSelector, useAppDispatch } from './redux/hooks';
import { useEffect } from 'react';
import Loading from './components/Loading';
import { selectVideosList, thunkFetchVideos } from './redux/videosSlice';

const App = () => {
  //const videos = useAppSelector((state) => state.videos.list);
  const videos = useAppSelector(selectVideosList);
  const status = useAppSelector((state) => state.videos.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(thunkFetchVideos());
  }, [dispatch]);

  return (
    <div className="App">
      {status === 'loading' ? (
        <Loading />
      ) : (
        videos.map((item: number) => <Test item={item} />)
      )}
    </div>
  );
};

interface TestComponentProps {
  item: number;
}

const Test = ({ item }: TestComponentProps) => {
  return (
    <div className="test">
      Test Bootstrap {item}
      <h1>Primary</h1>
      <h3>Tertiary</h3>
    </div>
  );
};

export default App;
