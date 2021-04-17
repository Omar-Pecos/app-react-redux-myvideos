import { NotificationProps } from '../interfaces';

const NotificationAlert = ({ error, message }: NotificationProps) => {
  return (
    <div className={'alert fade show alert-' + (error ? 'danger' : 'success')}>
      {message}
    </div>
  );
};

export default NotificationAlert;
