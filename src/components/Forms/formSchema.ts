import { InferType, boolean, mixed, number, object, ref, string } from 'yup';

const formSchema = object({
  username: string()
    .min(1, 'Name must be at least one character long')
    .required('Name required.')
    .test(
      'isFirstLetterUppercase',
      'Name must start with capital letter!',
      (value) => value !== '' && value[0].toUpperCase() === value[0]
    ),
  age: number()
    .nullable()
    .required('age is required')
    .transform((value: string, inputValue: string) =>
      inputValue.trim() === '' ? undefined : value
    )
    .positive('Age must be a positive number.')
    .min(18)
    .max(125),
  email: string().email().required(),
  password: string()
    .required('please enter password')
    .required('Please, enter a password.')
    .matches(/[0-9]/, 'should contain one number.')
    .matches(/[a-z]/, 'should contain one lowercase.')
    .matches(/[A-Z]/, 'should contain one uppercase.')
    .matches(/[!@#$%^&*]/, 'should contain one special symbol.'),
  confirmPassword: string()
    .oneOf([ref('password')], 'password must match')
    .required('please confirm you password'),
  gender: string().required('gender is required'),
  userAgreement: boolean()
    .required('Accept terms and conditions to proceed.')
    .test(
      'userAgreement',
      'You must accept terms and conditions to proceed',
      (value: boolean) => value
    ),

  file: mixed<FileList>()
    .nullable()
    .required('File required')
    .test('isSizeValid', 'File is too big!', (file) => {
      const fileSize = file?.item(0)?.size;
      return Boolean(!fileSize || (fileSize && fileSize <= 1024 * 5120));
    })
    .test('isExtensionValid', 'Only .jpeg and .png allowed!', (file) => {
      const regExp = /\jpe?g|png$/i;
      const fileExtension = file?.item(0)?.type;
      return Boolean(!file || (fileExtension && regExp.test(fileExtension)));
    }),
  country: string().required('you must provide the country to proceed')
});

export type Form = InferType<typeof formSchema>;
export default formSchema;
