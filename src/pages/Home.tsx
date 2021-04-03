import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { useEffect } from 'react';
import { thunkFetchVideos } from '../redux/actions/videos';
import Loading from '../components/Loading';
import { Video } from '../interfaces';
import VideoTile from '../components/VideoTile';
import VideoForm from '../components/VideoForm';

const Home = () => {
  const videos: Video[] = useAppSelector((state) => state.videos.list);
  const status = useAppSelector((state) => state.videos.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(thunkFetchVideos());
  }, [dispatch, videos.length]);

  return (
    <>
      <div className="row justify-content-center p-5">
        {/* Main content - list of videos */}
        <div className="col-md-8 order-2 order-md-1 overflow-auto content-principal">
          {status === 'loading' ? (
            <Loading />
          ) : (
            videos.map((video: Video) => (
              <VideoTile key={video.id} video={video} />
            ))
          )}
        </div>

        {/* Aside - form to add/edit video */}
        <VideoForm />
      </div>
    </>
  );
};

export default Home;
