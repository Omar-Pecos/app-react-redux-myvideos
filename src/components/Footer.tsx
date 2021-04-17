const Footer = () => {
  return (
    <div id="footer" className="row text-center bg-dark text-white m-md-1">
      <p className="h5 p-3">Omar Pecos - Full Stack Developer</p>

      <div className="col-3 col-md-2 col-xl-1">
        <img
          className="img-fluid"
          src="https://res.cloudinary.com/omarpvcloud/image/upload/v1606153378/logos/omarpv_logo_acrxqu.png"
          alt="omarpvLogo"
        />
      </div>

      <p className="h6 p-3">{new Date().getFullYear()}</p>
    </div>
  );
};

export default Footer;
