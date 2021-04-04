import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { useEffect, useState } from 'react';
import { thunkFetchVideos } from '../redux/actions/videos';
import Loading from '../components/Loading';
import { Video, videoDefaultObj } from '../interfaces';
import VideoTile from '../components/VideoTile';
import VideoForm from '../components/VideoForm';

const Home = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingVideo, setEditingVideo] = useState(videoDefaultObj);
  const videos: Video[] = useAppSelector((state) => state.videos.list);
  const status = useAppSelector((state) => state.videos.status);
  const dispatch = useAppDispatch();

  // WIP - performs two dispatches at init
  // one on init - lenght = 0
  // then length = videos.length
  // another when videos.lenght changes
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
              <VideoTile
                key={video.id}
                video={video}
                setIsEditing={setIsEditing}
                setEditingVideo={setEditingVideo}
              />
            ))
          )}
        </div>

        {/* Aside - form to add/edit video */}
        <VideoForm
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          editingVideo={editingVideo}
        />
      </div>
    </>
  );
};

export default Home;
