export interface Video {
  id: string;
  name: string;
  command: string;
  desc: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface VideoTileProps {
  video: Video;
  setIsEditing: Function;
  setEditingVideo: Function;
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
  desc: string;
  url: string;
}

export interface VideoFormProps {
  isEditing: boolean;
  setIsEditing: Function;
  editingVideo: Video;
}

export const videoDefaultObj: Video = {
  id: '0',
  name: '',
  command: '',
  desc: '',
  url: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
