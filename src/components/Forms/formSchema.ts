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
    .positive('Age must be a positive number.')
    .min(18)
    .max(125)
    .transform((value: string | number) => (value === '' ? undefined : value)),
  email: string().email(),
  password: string()
    .required('Please, enter a password.')
    .matches(/[0-9]/, 'should contain one number.')
    .matches(/[a-z]/, 'should contain one lowercase.')
    .matches(/[A-Z]/, 'should contain one uppercase.')
    .matches(/[!@#$%^&*]/, 'should contain one special symbol.'),
  confirmPassword: string()
    .oneOf([ref('password')], 'password must match')
    .required('please confirm you password'),
  gender: string().optional(),
  userAgreement: boolean().required('Accept terms and conditions to proceed.'),
  file: mixed<FileList>()
    .nullable()
    .test('isSizeValid', 'File is too big!', (file) => {
      const fileSize = file?.item(0)?.size;
      return Boolean(!fileSize || (fileSize && fileSize <= 1024 * 5120));
    })
    .test('isExtensionValid', 'Only .jpeg and .png allowed!', (file) => {
      const regExp = /\jpe?g|png$/i;
      const fileExtension = file?.item(0)?.type;
      return Boolean(!file || (fileExtension && regExp.test(fileExtension)));
    })
});

export type Form = InferType<typeof formSchema>;
export default formSchema;
