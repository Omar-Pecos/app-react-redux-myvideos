import { useParams } from 'react-router';
import { Video } from '../interfaces';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import playIcon from '../assets/icons/play.png';
import { useContext, useEffect, useState } from 'react';
import { thunkFetchVideos } from '../redux/actions/videos';
import { getYoutubeID, matchYoutubeLink } from '../utils/helpers';
import { toast } from 'react-toastify';
import ItemContext from '../components/itemContext';

interface PlayerProps {
  setItem: Function;
}

const items = [
  {
    id: 'fdgdfg',
    name: 'Video 1',
    command: 'video1',
    desc: 'Este es el video numero 1',
    url: 'fdkgdjkghdkfhgk.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
   {
    id: '45ppoigoighu',
    name: 'Video 2',
    command: 'video2',
    desc: 'Este es el video numero 2',
    url: 'fgoupidyhuifghyugi.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const Player = ({ setItem } : PlayerProps) => {
 const {item, name} = useContext(ItemContext);
  const { id } = useParams<{ id: string }>();
  const [videoId, setVideoId] = useState(id);
  const dispatch = useAppDispatch();
  const videos: Video[] = useAppSelector((state) => state.videos.list);
  const videosLoaded = videos?.length ? true : false;

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
      // setItem(video);
    }
  };

  return (
    <>
    <button onClick={() => setItem(items[0])}>Set item 1</button>
    <button onClick={() => setItem(items[1])}>Set item 2</button>
    <button onClick={() => setItem(null)}>Set to NULL</button>
     {item && (
        <div style={{padding: '50px', border: '2px solid purple'}}>
        <pre>
          {JSON.stringify(item)}
          {name.toUpperCase()}
        </pre>
      </div>
     )}
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
            {videos && videos.map((video: Video) => (
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
