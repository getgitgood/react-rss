import classes from '../../styles/Form.module.scss';
import formSchema from '../../utils/formSchema';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CountryAutocomplete from '../../components/AutocompleteComponent/AutocompleteComponent';
import { useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { convertFileToBase64String } from '../../utils/fileTo64baseConverter';
import { updateControlledFormSubmissions } from '../../features/formSlice';
import { ChangeEvent, useState } from 'react';
import PasswordStrengthComponent from '../../components/PasswordStrengthComponent/PasswordStrengthComponent';
import TextInput from '../../components/TextInput/TextInput';
import InputErrors from '../../components/InputErrors/InputErrors';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import CheckboxInput from '../../components/Checkbox/Checkbox';

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
    console.log(data);
    const inputFile = data.file.item(0);
    const file = await convertFileToBase64String(inputFile as File);
    const submissionData = { ...data, file };
    dispatch(updateControlledFormSubmissions(submissionData));
    navigate('/');
  };

  const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="true"
    >
      <fieldset>
        <legend>Briefly about yourself</legend>
        <div className={classes.input_container}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextInput
                {...{
                  placeholder: 'Must starts with a capital letter',
                  labelText: 'Enter your name:',
                  id: 'name',
                  name: 'name',
                  field: field
                }}
              />
            )}
          />

          {errors.name && <InputErrors message={errors.name.message} />}
        </div>

        <div className={classes.input_container}>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <TextInput
                {...{
                  placeholder: 'Positive number less than 125',
                  id: 'age',
                  type: 'number',
                  labelText: 'Enter your age:',
                  field: field
                }}
              />
            )}
          />
          {errors.age && <InputErrors message={errors.age.message} />}
        </div>

        <div className={classes.input_container}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                {...{
                  placeholder: 'Must be a valid email',
                  id: 'email',
                  labelText: 'Enter your email:',
                  field: field
                }}
              />
            )}
          />
          {errors.email && <InputErrors message={errors.email.message} />}
        </div>

        <div className={classes.input_container}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <PasswordInput
                {...{
                  type: 'password',
                  placeholder:
                    '1 number, 1 uppercase letter, 1 lowercased letter, 1 special character required',
                  id: 'password',
                  labelText: 'Enter your password:',
                  field: field,
                  handler: passwordChangeHandler
                }}
              />
            )}
          />
          {password && <PasswordStrengthComponent password={password} />}
          {errors.password && <InputErrors message={errors.password.message} />}
        </div>

        <div className={classes.input_container}>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextInput
                {...{
                  placeholder: 'Must be the same as password above',
                  id: 'confirmPassword',
                  type: 'password',
                  labelText: 'Confirm your password:',
                  field: field
                }}
              />
            )}
          />
          {errors.confirmPassword && (
            <InputErrors message={errors.confirmPassword.message} />
          )}
        </div>

        <div className={classes.input_container}>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <CountryAutocomplete
                {...field}
                id={'country'}
                labelText={'You are from:'}
                placeholder="Enter your country"
              />
            )}
          />
          {errors.country && <InputErrors message={errors.country.message} />}
        </div>
      </fieldset>

      <fieldset className={classes.gender_fieldset} id="gender" name="gender">
        <legend>Select your gender:</legend>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <TextInput
              {...{
                labelText: 'Male',
                value: 'male',
                field,
                type: 'radio'
              }}
            />
          )}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <TextInput
              {...{
                labelText: 'Female',
                value: 'female',
                field,
                type: 'radio'
              }}
            />
          )}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <TextInput
              {...{
                labelText: 'Not selected',
                value: 'not selected',
                field,
                type: 'radio'
              }}
            />
          )}
        />
        {errors.gender && <InputErrors message={errors.gender.message} />}
      </fieldset>

      <fieldset className={`${classes.input_container}`}>
        <legend>Provide your image.</legend>
        <label htmlFor="file"></label>
        <input
          {...register('file')}
          type="file"
          className={classes.input_file}
        />
        {errors.file && <InputErrors message={errors.file.message} />}
      </fieldset>

      <div className={`${classes.input_container} ${classes.input_inline}`}>
        <Controller
          name="userAgreement"
          control={control}
          render={({ field }) => (
            <CheckboxInput
              {...{
                labelText: 'I have read and accept the terms and conditions:',
                id: 'agreement',
                field,
                type: 'checkbox',
                className: classes.input_agreement
              }}
            />
          )}
        />
        {errors.userAgreement && (
          <InputErrors message={errors.userAgreement.message} />
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
