import formSchema from '../../components/Forms/formSchema';
import classes from './UncontrolForm.module.scss';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export default function UncontrolForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: 'onChange'
  });

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.input_container}>
        <label htmlFor="username">username</label>
        <input id="username" {...register('username')} />
      </div>
      {errors.username && <p>{errors.username.message}</p>}

      <div className={classes.input_container}>
        <label htmlFor="age">age</label>
        <input type="number" id="age" {...register('age')} />
      </div>
      {errors.age && <p>{errors.age.message}</p>}

      <div className={classes.input_container}>
        <label htmlFor="email">email</label>
        <input id="email" {...register('email')} />
      </div>
      {errors.email && <p>{errors.email.message}</p>}

      <div className={classes.input_container}>
        <label htmlFor="password">enter password</label>
        <input id="password" {...register('password')} />
      </div>
      {errors.password && <p>{errors.password.message}</p>}

      <div className={classes.input_container}>
        <label htmlFor="confirmPassword">confirm password</label>
        <input id="confirmPassword" {...register('confirmPassword')} />
      </div>
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <fieldset id="gender">
        <legend>gender</legend>
        <p>
          Male
          <input name="gender" type="radio" value={'male'} />
        </p>
        <p>
          Female
          <input name="gender" type="radio" value={'female'} />
        </p>

        <p>
          Not selected
          <input
            name="gender"
            type="radio"
            value={'not selected'}
            defaultChecked={true}
          />
        </p>
      </fieldset>
      <div className={classes.input_container}>
        <label htmlFor="agreement">
          I have read and accept the terms and conditions
        </label>
        <input {...register('userAgreement')} id="agreement" type="checkbox" />
      </div>
      {errors.userAgreement && <p>{errors.userAgreement.message}</p>}

      <div className={classes.input_container}>
        Provide your image if you want.
        <input {...register('file')} type="file" />
      </div>
      {errors.file && <p>{errors.file.message}</p>}
      <div className={classes.input_container}>
        <button className={classes.submit_btn} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
