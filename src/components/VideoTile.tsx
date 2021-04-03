import { VideoTileProps } from '../interfaces';
import playIcon from '../assets/icons/play.png';
import editIcon from '../assets/icons/edit.png';
import deleteIcon from '../assets/icons/delete.png';

const VideoTile = ({ video }: VideoTileProps) => {
  return (
    <div id="video-tile" className="row">
      <div className="col-3 col-md-2 mt-2 mt-lg-4 mt-xl-5">
        {/* Play icon */}
        <img
          src={playIcon}
          className="image-fluid"
          alt="Play"
          style={{ width: '100%' }}
        />
      </div>
      <div className="col mt-2 mt-lg-4 mt-xl-5">
        <h4>{video.name}</h4>

        {video.desc ? <p>{video.desc}</p> : <p>No description</p>}

        <div className="d-flex flex-row justify-content-end operations-bar">
          {/* Edit icon - .image-fluid */}
          <img src={editIcon} className="image-fluid" alt="Edit" />
          {/* Delete icon - .image-fluid */}
          <img src={deleteIcon} className="image-fluid" alt="Delete" />
        </div>
      </div>
    </div>
  );
};

export default VideoTile;
