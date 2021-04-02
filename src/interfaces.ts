export interface Video {
  id: string;
  name: string;
  command: string;
  desc: string | null;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface TestComponentProps {
  video: Video;
}

export interface NotificationProps {
  error: boolean;
  message: string;
}
