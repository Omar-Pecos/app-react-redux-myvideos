import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../redux/hooks';
import ValidationMessage from './ValidationMessage';
import { thunkAddVideo } from '../redux/actions/videos';
import { IFormInputs } from '../interfaces';

const VideoForm = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    criteriaMode: 'all',
  });
  const onSubmit = (data: IFormInputs) => {
    //TODO - if editing/or creating dispatch different actions !
    //default creating new
    dispatch(thunkAddVideo(data));
  };

  return (
    <div className="col-10 col-md-4 order-1 order-md-2 p-3">
      <h3 className="text-center">Add new video</h3>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name" className="form-control-label">
            Name *
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            {...register('name', { required: true })}
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
            {...register('command', { required: true })}
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
            {...register('description')}
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
            {...register('url', { required: true, minLength: 10 })}
          />
          {errors.url && errors.url.type === 'required' && (
            <ValidationMessage message="This field is required" />
          )}
          {errors.url && errors.url.type === 'minLength' && (
            <ValidationMessage message="The minimun length for a Url is 10 chars" />
          )}
        </div>

        <p className="text-center p-3">
          <input type="submit" value="Send" className="btn btn-success" />
        </p>
      </form>
    </div>
  );
};

export default VideoForm;
