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
    .required('age is required')
    .test('isInteger', 'Only integer numbers.', (value) => {
      return typeof value === 'number' && !/[eE+-]/.test(value.toString());
    })
    .transform((value: string | number, inputValue: string) => {
      return typeof value === 'string' && inputValue.trim() === ''
        ? undefined
        : value;
    })
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

  file: mixed<File>()
    .required()
    .test('isSizeValid', 'File is too big!', (file) => {
      if (file instanceof FileList) {
        const fileSize = file.item(0)?.size;
        return Boolean(!fileSize || (fileSize && fileSize <= 1024 * 5120));
      }
      const fileSize = file.size;
      return Boolean(!fileSize || (fileSize && fileSize <= 1024 * 5120));
    })
    .test('isExtensionValid', 'Only .jpeg and .png allowed!', (file) => {
      const regExp = /\jpe?g|png$/i;
      if (file instanceof FileList) {
        const fileExtension = file.item(0)?.type;
        return Boolean(!file || (fileExtension && regExp.test(fileExtension)));
      }
      const fileExtension = file.type;
      return Boolean(!file || (fileExtension && regExp.test(fileExtension)));
    }),
  country: string().required('you must provide the country to proceed')
});

export type Form = InferType<typeof formSchema>;
export default formSchema;
