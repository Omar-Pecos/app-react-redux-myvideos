import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../redux/hooks';
import ValidationMessage from './ValidationMessage';
import { thunkAddVideo, thunkEditVideo } from '../redux/actions/videos';
import { IFormInputs, VideoFormProps } from '../interfaces';
import { useEffect } from 'react';

const VideoForm = ({
  isEditing,
  setIsEditing,
  editingVideo,
}: VideoFormProps) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    criteriaMode: 'all',
  });
  const onSubmit = (data: IFormInputs) => {
    if (isEditing) {
      const id = editingVideo?.id;
      dispatch(thunkEditVideo(id, data));
      setIsEditing(false);
    } else {
      //default creating new
      dispatch(thunkAddVideo(data));
    }

    reset();
  };

  useEffect(() => {
    if (isEditing) {
      let options = { shouldDirty: true, shouldValidate: true };
      setValue('name', editingVideo?.name, options);
      setValue('command', editingVideo?.command, options);
      setValue('desc', editingVideo?.desc, options);
      setValue('url', editingVideo?.url, options);
    } else {
      reset();
    }
  }, [isEditing, setValue, reset, editingVideo]);

  return (
    <div className="col-10 col-md-4 order-1 order-md-2 p-3">
      {isEditing && (
        <p style={{ textAlign: 'center' }}>
          <button
            onClick={() => setIsEditing(false)}
            className="btn btn-success"
          >
            To Add mode again
          </button>
        </p>
      )}
      <h3 className="text-center">
        {isEditing ? 'Edit video' : 'Add new video'}
      </h3>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name" className="form-control-label">
            Name *
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            {...register('name', {
              required: true,
            })}
          />
          {errors.name && errors.name.type === 'required' && (
            <ValidationMessage message="This field is required" />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="command" className="form-control-label">
            Short name (Command) *
          </label>
          <input
            className="form-control"
            type="text"
            id="command"
            {...register('command', {
              required: true,
            })}
          />
          {errors.command && errors.command.type === 'required' && (
            <ValidationMessage message="This field is required" />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="desc" className="form-control-label">
            Description
          </label>
          <input
            className="form-control"
            type="text"
            id="desc"
            {...register('desc')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="url" className="form-control-label">
            Url *
          </label>
          <input
            className="form-control"
            type="text"
            id="url"
            {...register('url', {
              required: true,
              minLength: 10,
            })}
          />
          {errors.url && errors.url.type === 'required' && (
            <ValidationMessage message="This field is required" />
          )}
          {errors.url && errors.url.type === 'minLength' && (
            <ValidationMessage message="The minimun length for a Url is 10 chars" />
          )}
        </div>

        <p className="text-center p-3">
          <input
            type="submit"
            value={isEditing ? 'Edit' : 'Save'}
            className="btn btn-success"
          />
        </p>
      </form>
    </div>
  );
};

export default VideoForm;
