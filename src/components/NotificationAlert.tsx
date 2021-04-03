import { NotificationProps } from '../interfaces';

const NotificationAlert = ({ error, message }: NotificationProps) => {
  const interval = setInterval(() => closeAlert(), 5000);
  const closeAlert = () => {
    let alerts = Array.from(document.getElementsByClassName('alert'));
    alerts.forEach((alert) => {
      alert.remove();
    });
    clearInterval(interval);
  };

  return (
    <div
      className={
        'alert alert-dismissible fade show alert-' +
        (error ? 'danger' : 'success')
      }
    >
      {message}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default NotificationAlert;
