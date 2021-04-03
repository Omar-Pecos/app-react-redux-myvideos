export interface Video {
  id: string;
  name: string;
  command: string;
  desc: string | null;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface VideoTileProps {
  video: Video;
}

export interface NotificationProps {
  error: boolean;
  message: string;
}

export interface ValidationMessageProps {
  message: string;
}

export interface IFormInputs {
  name: string;
  command: string;
  description: string;
  url: string;
}
