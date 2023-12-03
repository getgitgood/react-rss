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
  const dispatch = useAppDispatch();

  const mapFormDataToObject = (formData: FormData): Form => {
    return {
      username: formData.get('username') as string,
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

  return (
    <form ref={formRef} className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.input_container}>
        <label htmlFor="username">name</label>
        <input name="username" id="username" type="text" />
      </div>
      {errors.username && <p>{errors.username.message}</p>}

      <div className={classes.input_container}>
        <label htmlFor="age">age</label>
        <input name="age" type="number" id="age" />
      </div>
      {errors.age && <p>{errors.age.message}</p>}

      <div className={classes.input_container}>
        <label htmlFor="email">email</label>
        <input name="email" id="email" />
      </div>
      {errors.email && <p>{errors.email.message}</p>}

      <div className={classes.input_container}>
        <label htmlFor="password">enter password</label>
        <input name="password" id="password" type="text" />
      </div>
      {errors.password && <p>{errors.password.message}</p>}

      <div className={classes.input_container}>
        <label htmlFor="confirmPassword">confirm password</label>
        <input name="confirmPassword" id="confirmPassword" type="text" />
      </div>
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <fieldset id="gender" name="gender">
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
          <input name="gender" type="radio" value={'not selected'} />
        </p>
        {errors.gender && <p>gender is required</p>}
      </fieldset>

      <div className={classes.input_container}>
        <label htmlFor="agreement">
          I have read and accept the terms and conditions
        </label>
        <input name="agreement" id="agreement" type="checkbox" />
      </div>
      {errors.userAgreement && <p>{errors.userAgreement.message}</p>}

      <div className={classes.input_container}>
        Provide your image.
        <input name="file" type="file" />
      </div>
      {errors.file && <p>{errors.file.message}</p>}

      <div className={classes.input_container}>
        <label htmlFor="country">Provide your country.</label>
        <CountryAutocomplete value="" />
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
