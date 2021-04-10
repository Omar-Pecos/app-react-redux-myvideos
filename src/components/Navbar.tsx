import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavBar = () => {
  const error = useAppSelector((state) => state.videos.error);
  const message = useAppSelector((state) => state.videos.message);

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  useEffect(() => {
    if (message) {
      notify(message, error === true ? 'error' : 'success');
    }
  }, [message, error]);

  const notify = (msg: string, type: string) =>
    type === 'error' ? toast.error(msg) : toast.success(msg);

  return (
    <>
      <div className="row justify-content-center m-0 m-md-3">
        <div className="col-3 col-md-2 col-xl-1">
          <img
            className="img-fluid"
            src="https://res.cloudinary.com/omarpvcloud/image/upload/v1606153378/logos/omarpv_logo_acrxqu.png"
            alt="omarpvLogo"
          />
        </div>
      </div>

      {/* nav */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            My Videos
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={!isNavCollapsed ? true : false}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/player/vfxhcjyet85"
                >
                  Player
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ToastContainer newestOnTop={true} />
    </>
  );
};

export default NavBar;
