import formSchema from '../../components/Forms/formSchema';
import classes from './ReactForm.module.scss';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CountryAutocomplete from '../../components/CountryAutocomplete/CountryAutocomplete';
import { useAppDispatch } from '../../hooks';
import { updateUncontrolFormsSubmissions } from '../../features/uncontrolFormSlice';
import { useNavigate } from 'react-router-dom';
import { convertFileToBase64String } from '../../helpers/fileTo64baseConverter';

export default function UncontrolForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: 'onChange'
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FieldValues) => {
    const inputFile = data.file.item(0);
    const file = await convertFileToBase64String(inputFile as File);
    const submissionData = { ...data, file };
    dispatch(updateUncontrolFormsSubmissions(submissionData));
    navigate('/');
  };

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
          <input
            {...register('gender')}
            name="gender"
            type="radio"
            value={'male'}
          />
        </p>
        <p>
          Female
          <input
            {...register('gender')}
            name="gender"
            type="radio"
            value={'female'}
          />
        </p>

        <p>
          Not selected
          <input
            {...register('gender')}
            name="gender"
            type="radio"
            value={'not selected'}
          />
        </p>
        {errors.gender && <p>gender is required</p>}
      </fieldset>
      <div className={classes.input_container}>
        <label htmlFor="agreement">
          I have read and accept the terms and conditions
        </label>
        <input {...register('userAgreement')} id="agreement" type="checkbox" />
      </div>
      {errors.userAgreement && <p>{errors.userAgreement.message}</p>}

      <div className={classes.input_container}>
        Provide your image. It`s obligatory.
        <input {...register('file')} type="file" />
      </div>
      {errors.file && <p>{errors.file.message}</p>}

      <div className={classes.input_container}>
        <label htmlFor="country"> Provide your country. It`s obligatory.</label>
        <Controller
          name="country"
          control={control}
          render={({ field }) => <CountryAutocomplete {...field} />}
        />
      </div>
      {errors.country && <p>{errors.country.message}</p>}
      <div className={classes.input_container}>
        <button
          formAction="submit"
          className={classes.submit_btn}
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
