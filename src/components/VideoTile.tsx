import { Video, VideoTileProps } from '../interfaces';
import playIcon from '../assets/icons/play.png';
import editIcon from '../assets/icons/edit.png';
import deleteIcon from '../assets/icons/delete.png';
import { Link } from 'react-router-dom';
import { getYoutubeID, matchYoutubeLink } from '../utils/helpers';

const VideoTile = ({
  video,
  setIsEditing,
  setEditingVideo,
  showSwalDeleteConfirmation,
}: VideoTileProps) => {
  const sendVideoToEdit = (video: Video) => {
    setEditingVideo(video);
    setIsEditing(true);
  };
  return (
    <div id="video-tile" className="row">
      <div className="col-3 col-md-2 mt-2 mt-lg-4 mt-xl-5">
        {/* Play icon */}
        <Link
          to={
            matchYoutubeLink(video.url)
              ? `/player/${getYoutubeID(video.url)}`
              : '#'
          }
        >
          <img
            src={playIcon}
            className="image-fluid"
            alt="Play"
            style={{ width: '100%' }}
          />
        </Link>
      </div>
      <div className="col mt-2 mt-lg-4 mt-xl-5">
        <h4>{video.name}</h4>

        {video.desc ? <p>{video.desc}</p> : <p>No description</p>}

        <div className="d-flex flex-row justify-content-end operations-bar">
          {/* Edit icon - .image-fluid */}
          <img
            src={editIcon}
            className="image-fluid"
            alt="Edit"
            onClick={() => sendVideoToEdit({ ...video })}
          />
          {/* Delete icon - .image-fluid */}
          <img
            src={deleteIcon}
            className="image-fluid"
            alt="Delete"
            onClick={() => showSwalDeleteConfirmation(video)}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoTile;
