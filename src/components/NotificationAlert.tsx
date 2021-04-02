import { NotificationProps } from '../interfaces';

const NotificationAlert = ({ error, message }: NotificationProps) => {
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
