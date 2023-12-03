import classes from '../../styles/Form.module.scss';
import formSchema from '../../components/Forms/formSchema';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CountryAutocomplete from '../../components/CountryAutocomplete/CountryAutocomplete';
import { useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { convertFileToBase64String } from '../../helpers/fileTo64baseConverter';
import { updateReactFormSubmissions } from '../../features/reactFormSlice';
import { ChangeEvent, useState } from 'react';
import PasswordStrengthDisplay from '../../components/PasswordStraightDisplay/PasswordStrengthDisplay';

export default function UncontrolForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: 'onChange'
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState('');

  const onSubmit = async (data: FieldValues) => {
    const inputFile = data.file.item(0);
    const file = await convertFileToBase64String(inputFile as File);
    const submissionData = { ...data, file };
    dispatch(updateReactFormSubmissions(submissionData));
    navigate('/');
  };

  const passwordRegistration = register('password');

  const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    passwordRegistration.onChange(e);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Briefly about yourself</legend>
        <div className={classes.input_container}>
          <label htmlFor="name">Enter your name:</label>
          <input
            placeholder="Must starts with a capital letter"
            id="name"
            {...register('name')}
          />
          {errors.name && (
            <p className={classes.form_error}>{errors.name.message}</p>
          )}
        </div>

        <div className={classes.input_container}>
          <label htmlFor="age">Enter your age:</label>
          <input
            placeholder="Between 18 and 125"
            type="number"
            id="age"
            {...register('age')}
          />
          {errors.age && (
            <p className={classes.form_error}>{errors.age.message}</p>
          )}
        </div>

        <div className={classes.input_container}>
          <label htmlFor="email">Enter your email:</label>
          <input
            placeholder="Must be a valid email"
            id="email"
            {...register('email')}
          />
          {errors.email && (
            <p className={classes.form_error}>{errors.email.message}</p>
          )}
        </div>

        <div className={classes.input_container}>
          <label htmlFor="password">Enter your password:</label>
          <input
            placeholder="1 number, 1 uppercase letter, 1 lowercased letter, 1 special character required"
            id="password"
            onChange={(e) => passwordChangeHandler(e)}
            ref={passwordRegistration.ref}
            onBlur={passwordRegistration.onBlur}
            name={passwordRegistration.name}
          />
          {password && <PasswordStrengthDisplay password={password} />}
          {errors.password && (
            <p className={classes.form_error}>{errors.password.message}</p>
          )}
        </div>

        <div className={classes.input_container}>
          <label htmlFor="confirmPassword">Confirm your password:</label>
          <input
            placeholder="Must be the same as password above"
            id="confirmPassword"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className={classes.form_error}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className={classes.input_container}>
          <label htmlFor="country">You are from:</label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => <CountryAutocomplete {...field} />}
          />
          {errors.country && (
            <p className={classes.form_error}>{errors.country.message}</p>
          )}
        </div>
      </fieldset>

      <fieldset className={classes.gender_fieldset} id="gender" name="gender">
        <legend>Select your gender:</legend>
        <label htmlFor="gender">Male</label>
        <input
          {...register('gender')}
          name="gender"
          type="radio"
          value={'male'}
        />
        <label htmlFor="gender">Female</label>
        <input
          {...register('gender')}
          name="gender"
          type="radio"
          value={'female'}
        />

        <label htmlFor="gender">Not selected</label>
        <input
          {...register('gender')}
          name="gender"
          type="radio"
          value={'not selected'}
        />
        {errors.gender && (
          <p className={classes.form_error}>gender is required</p>
        )}
      </fieldset>

      <fieldset className={`${classes.input_container}`}>
        <legend>Provide your image.</legend>
        <label htmlFor="file"></label>
        <input
          {...register('file')}
          type="file"
          className={classes.input_file}
        />
        {errors.file && (
          <p className={classes.form_error}>{errors.file.message}</p>
        )}
      </fieldset>

      <div className={`${classes.input_container} ${classes.input_inline}`}>
        <label htmlFor="agreement">
          I have read and accept the terms and conditions:
        </label>
        <input
          {...register('userAgreement')}
          className={classes.input_agreement}
          id="agreement"
          type="checkbox"
        />
        {errors.userAgreement && (
          <p className={classes.form_error}>{errors.userAgreement.message}</p>
        )}
      </div>

      <div className={classes.input_container}>
        <button
          formAction="submit"
          className={classes.submit_btn}
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
