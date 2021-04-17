import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { useEffect, useState, useRef } from 'react';
import { thunkDeleteVideo, thunkFetchVideos } from '../redux/actions/videos';
import Loading from '../components/Loading';
import { Video, videoDefaultObj } from '../interfaces';
import VideoTile from '../components/VideoTile';
import VideoForm from '../components/VideoForm';
import Swal, { SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Home = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingVideo, setEditingVideo] = useState(videoDefaultObj);
  const videos: Video[] = useAppSelector((state) => state.videos.list);
  const status = useAppSelector((state) => state.videos.status);
  const dispatch = useAppDispatch();

  const numOfLoads = useRef(0);
  useEffect(() => {
    if (numOfLoads.current !== 1) {
      dispatch(thunkFetchVideos());
    }
    numOfLoads.current += 1;
  }, [dispatch, videos.length]);

  const showSwalDeleteConfirmation = (video: Video) => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: `El video ${video.name} se eliminará`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: 'red',
      focusCancel: true,
    }).then((onfullfilled: SweetAlertResult) => {
      if (onfullfilled.isConfirmed) {
        dispatch(thunkDeleteVideo(video.id));
      }
      return MySwal.close();
    });
  };

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
                showSwalDeleteConfirmation={showSwalDeleteConfirmation}
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
