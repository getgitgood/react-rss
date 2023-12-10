import classes from '../../styles/Form.module.scss';
import formSchema, { Form } from '../../utils/formSchema';
import CountryAutocomplete from '../../components/AutocompleteComponent/AutocompleteComponent';
import { useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { ValidationErrors } from '../../types/types';
import { ValidationError } from 'yup';
import { convertFileToBase64String } from '../../utils/fileTo64baseConverter';
import { updateUncontrolledFormSubmissions } from '../../features/formSlice';
import PasswordStrengthComponent from '../../components/PasswordStrengthComponent/PasswordStrengthComponent';
import TextInput from '../../components/TextInput/TextInput';
import InputErrors from '../../components/InputErrors/InputErrors';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import CheckboxInput from '../../components/Checkbox/Checkbox';

export default function UncontrolForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({} as ValidationErrors);
  const [password, setPassword] = useState('');
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);
  const dispatch = useAppDispatch();

  const mapFormDataToObject = (formData: FormData): Form => {
    console.log(Boolean(formData.get('userAgreement')));
    return {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      userAgreement: Boolean(formData.get('userAgreement')),
      file: formData.get('file') as unknown as File,
      country: formData.get('country') as string
    };
  };

  const checkAllFieldsFilled = () => {
    const formData = new FormData(formRef.current as HTMLFormElement);
    const fields = [
      'name',
      'age',
      'email',
      'password',
      'confirmPassword',
      'gender',
      'userAgreement',
      'file',
      'country'
    ];
    const file = formData.get('file') as File;
    const isFileProvided = Boolean(file.size && file.name);
    const isAllFieldsFilled = fields.every((field) => {
      const value = formData.get(field);
      return value !== null && value !== '';
    });
    setIsAllFieldsFilled(isAllFieldsFilled && isFileProvided);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current as HTMLFormElement);
    const formDataObject = mapFormDataToObject(formData);
    try {
      await formSchema.validate(formDataObject, { abortEarly: false });
      setErrors({} as ValidationErrors);
      const file = await convertFileToBase64String(formDataObject.file);
      const formSubmission = { ...formDataObject, file };
      dispatch(updateUncontrolledFormSubmissions(formSubmission));
      navigate('/');
    } catch (e) {
      console.log(e);
      if (e instanceof ValidationError) {
        const newErrors = e.inner.reduce((acc, currentError) => {
          const path = currentError.path as keyof ValidationErrors | undefined;
          if (path) {
            acc[path] = { message: currentError.message };
          }
          return acc;
        }, {} as ValidationErrors);
        setErrors(newErrors);
      }
    }
  };

  const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    checkAllFieldsFilled();
  };

  return (
    <form
      ref={formRef}
      className={classes.form}
      onSubmit={handleSubmit}
      autoComplete="true"
    >
      <fieldset>
        <legend>Briefly about yourself</legend>
        <div className={classes.input_container}>
          <TextInput
            placeholder={'Must starts with a capital letter'}
            labelText={'Enter your name:'}
            id={'name'}
            name={'name'}
            onChange={checkAllFieldsFilled}
          />
          {errors.name && <InputErrors message={errors.name.message} />}
        </div>

        <div className={classes.input_container}>
          <TextInput
            placeholder="Positive number less than 125"
            labelText={'Enter your age:'}
            name="age"
            type="number"
            id="age"
            onChange={checkAllFieldsFilled}
          />
          {errors.age && <InputErrors message={errors.age.message} />}
        </div>

        <div className={classes.input_container}>
          <TextInput
            placeholder="Must be a valid email"
            labelText={'Enter your email:'}
            name="email"
            id="email"
            onChange={checkAllFieldsFilled}
          />
          {errors.email && <InputErrors message={errors.email.message} />}
        </div>

        <div className={classes.input_container}>
          <PasswordInput
            placeholder="1 number, 1 uppercase letter, 1 lowercased letter, 1 special character required"
            labelText={'Enter your password:'}
            id="password"
            type="text"
            handler={passwordChangeHandler}
          />
          {password && <PasswordStrengthComponent password={password} />}
          {errors.password && (
            <p className={classes.form_error}>{errors.password.message}</p>
          )}
        </div>

        <div className={classes.input_container}>
          <TextInput
            placeholder={'Must be the same as password above'}
            labelText={'Confirm your password:'}
            name="confirmPassword"
            id="confirmPassword"
            type="text"
            onChange={checkAllFieldsFilled}
          />
          {errors.confirmPassword && (
            <InputErrors message={errors.confirmPassword.message} />
          )}
        </div>

        <div className={classes.input_container}>
          <CountryAutocomplete
            value=""
            labelText="You are from:"
            placeholder="Enter your country"
            id="country"
            checkAllFieldsFilled={checkAllFieldsFilled}
          />
          {errors.country && <InputErrors message={errors.country.message} />}
        </div>
      </fieldset>

      <fieldset className={classes.gender_fieldset} id="gender" name="gender">
        <legend>Select your gender:</legend>
        <TextInput
          labelText="Male"
          id={'gender'}
          name="gender"
          value="male"
          type="radio"
          onChange={checkAllFieldsFilled}
        />
        <TextInput
          labelText="Female"
          id={'gender'}
          name="gender"
          value="female"
          type="radio"
          onChange={checkAllFieldsFilled}
        />
        <TextInput
          labelText="Not selected"
          id={'gender'}
          name="gender"
          value="not selected"
          type="radio"
          onChange={checkAllFieldsFilled}
        />

        {errors.gender && <InputErrors message={errors.gender.message} />}
      </fieldset>

      <fieldset className={`${classes.input_container}`}>
        <legend>Provide your image.</legend>
        <label htmlFor="file" />

        <input
          name="file"
          type="file"
          className={classes.input_file}
          onChange={checkAllFieldsFilled}
        />
        {errors.file && <InputErrors message={errors.file.message} />}
      </fieldset>

      <div className={`${classes.input_container} ${classes.input_inline}`}>
        <CheckboxInput
          className={classes.input_agreement}
          labelText="I have read and accept the terms and conditions"
          name="userAgreement"
          id="userAgreement"
          type="checkbox"
          onChange={checkAllFieldsFilled}
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
          disabled={!isAllFieldsFilled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
