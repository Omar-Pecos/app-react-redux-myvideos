import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { useEffect } from 'react';
import { thunkFetchVideos } from '../redux/actions/videos';
import Loading from '../components/Loading';
import { Video } from '../interfaces';
import VideoTile from '../components/VideoTile';

const Home = () => {
  const videos: Video[] = useAppSelector((state) => state.videos.list);
  const status = useAppSelector((state) => state.videos.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (videos.length === 0) dispatch(thunkFetchVideos());
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
        <div className="col-10 col-md-4 order-1 order-md-2 p-3">
          <h3 className="text-center">Add new video</h3>

          <form className="form">
            <div className="form-group">
              <label htmlFor="name" className="form-control-label">
                Name *
              </label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="command" className="form-control-label">
                Short name *
              </label>
              <input
                className="form-control"
                type="text"
                name="command"
                id="command"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="desc" className="form-control-label">
                Description
              </label>
              <input
                className="form-control"
                type="text"
                name="desc"
                id="desc"
              />
            </div>
            <div className="form-group">
              <label htmlFor="url" className="form-control-label">
                Url *
              </label>
              <input
                className="form-control"
                type="text"
                name="url"
                id="url"
                required
              />
            </div>

            <p className="text-center p-3">
              <input type="submit" value="Send" className="btn btn-success" />
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
