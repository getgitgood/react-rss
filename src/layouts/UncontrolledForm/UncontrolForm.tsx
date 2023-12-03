import classes from '../../styles/Form.module.scss';
import formSchema, { Form } from '../../components/Forms/formSchema';
import CountryAutocomplete from '../../components/CountryAutocomplete/CountryAutocomplete';
import { useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useRef, useState } from 'react';
import { ValidationErrors } from '../../types/types';
import { ValidationError } from 'yup';
import { convertFileToBase64String } from '../../helpers/fileTo64baseConverter';
import { updateUncontrolFormsSubmissions } from '../../features/uncontrolFormSlice';

export default function UncontrolForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({} as ValidationErrors);
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);
  const dispatch = useAppDispatch();
  const mapFormDataToObject = (formData: FormData): Form => {
    return {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      userAgreement: Boolean(formData.get('agreement')),
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
      'agreement',
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
      dispatch(updateUncontrolFormsSubmissions(formSubmission));
      navigate('/');
    } catch (e) {
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

  return (
    <form ref={formRef} className={classes.form} onSubmit={handleSubmit}>
      <fieldset>
        <legend>Briefly about yourself</legend>
        <div className={classes.input_container}>
          <label htmlFor="name">Enter your name:</label>
          <input
            placeholder="Must starts with a capital letter"
            name="name"
            id="name"
            type="text"
            onChange={checkAllFieldsFilled}
          />
          {errors.name && (
            <p className={classes.form_error}>{errors.name.message}</p>
          )}
        </div>

        <div className={classes.input_container}>
          <label htmlFor="age">Enter your age:</label>
          <input
            placeholder="Between 18 and 125"
            name="age"
            type="number"
            id="age"
            onChange={checkAllFieldsFilled}
          />
          {errors.age && (
            <p className={classes.form_error}>{errors.age.message}</p>
          )}
        </div>

        <div className={classes.input_container}>
          <label htmlFor="email">Enter your email:</label>
          <input
            placeholder="Must be a valid email"
            name="email"
            id="email"
            onChange={checkAllFieldsFilled}
          />
          {errors.email && (
            <p className={classes.form_error}>{errors.email.message}</p>
          )}
        </div>

        <div className={classes.input_container}>
          <label htmlFor="password">Enter your password:</label>
          <input
            placeholder="1 number, 1 uppercase letter, 1 lowercased letter, 1 special character required"
            name="password"
            id="password"
            type="text"
            onChange={checkAllFieldsFilled}
          />
          {errors.password && (
            <p className={classes.form_error}>{errors.password.message}</p>
          )}
        </div>

        <div className={classes.input_container}>
          <label htmlFor="confirmPassword">Confirm your password:</label>
          <input
            placeholder="Must be the same as password above"
            name="confirmPassword"
            id="confirmPassword"
            type="text"
            onChange={checkAllFieldsFilled}
          />
          {errors.confirmPassword && (
            <p className={classes.form_error}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className={classes.input_container}>
          <label htmlFor="country">You are from:</label>
          <CountryAutocomplete
            value=""
            checkAllFieldsFilled={checkAllFieldsFilled}
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
          name="gender"
          type="radio"
          value={'male'}
          onChange={checkAllFieldsFilled}
        />

        <label htmlFor="gender">Female</label>
        <input
          name="gender"
          type="radio"
          value={'female'}
          onChange={checkAllFieldsFilled}
        />

        <label htmlFor="gender">Not selected</label>
        <input
          name="gender"
          type="radio"
          value={'not selected'}
          onChange={checkAllFieldsFilled}
        />

        {errors.gender && (
          <p className={classes.form_error}>gender is required</p>
        )}
      </fieldset>

      <fieldset className={`${classes.input_container}`}>
        <legend>Provide your image.</legend>
        <label htmlFor="file"></label>

        <input
          name="file"
          type="file"
          className={classes.input_file}
          onChange={checkAllFieldsFilled}
        />
        {errors.file && (
          <p className={classes.form_error}>{errors.file.message}</p>
        )}
      </fieldset>
      <div className={`${classes.input_container} ${classes.input_inline}`}>
        <label htmlFor="agreement">
          I have read and accept the terms and conditions
        </label>
        <input
          className={classes.input_agreement}
          name="agreement"
          id="agreement"
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
