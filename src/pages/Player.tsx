import { useParams } from 'react-router';
import { Video } from '../interfaces';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import playIcon from '../assets/icons/play.png';
import { useEffect, useState } from 'react';
import { thunkFetchVideos } from '../redux/actions/videos';
import { getYoutubeID, matchYoutubeLink } from '../utils/helpers';
import { toast } from 'react-toastify';

const Player = () => {
  const { id } = useParams<{ id: string }>();
  const [videoId, setVideoId] = useState(id);
  const dispatch = useAppDispatch();
  const videos: Video[] = useAppSelector((state) => state.videos.list);
  const videosLoaded = videos.length === 0 ? false : true;

  useEffect(() => {
    if (!videosLoaded) {
      dispatch(thunkFetchVideos());
    }
  }, [dispatch, videosLoaded]);

  const openVideo = (url: string) => {
    if (!matchYoutubeLink(url)) {
      toast.error('This isn´t a video valid url');
    } else {
      const youtubeLinkID = getYoutubeID(url);
      setVideoId(youtubeLinkID || '3hp5CX4iS7M');
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-lg-8 p-3">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              title="Youtube embed player"
              className="embed-responsive-item"
              src={`https://www.youtube.com/embed/${videoId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="col-12 col-lg-4 p-3">
          <ul className="unstyled-list overflow-auto video-small-list">
            {videos.map((video: Video) => (
              <li key={video.id} onClick={() => openVideo(video.url)}>
                <img
                  width="50"
                  className="img-fluid"
                  src={playIcon}
                  alt="play"
                />
                <div
                  className="text-center p-2"
                  style={{ width: '100% !important' }}
                >
                  {video.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Player;
