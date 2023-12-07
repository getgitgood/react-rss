import { InferType, boolean, mixed, number, object, ref, string } from 'yup';

const formSchema = object({
  name: string()
    .min(1, 'Name must be at least one character long')
    .required('Name required.')
    .test(
      'isFirstLetterUppercase',
      'Name must start with capital letter!',
      (value) => value !== '' && value[0].toUpperCase() === value[0]
    ),
  age: number()
    .required('age is required')
    .positive('Age must be a positive number.')
    .typeError('Amount must be a number')
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
    .test('isSizeValid', 'File required!', (file) => {
      let fileSize;
      let fileName;
      if (file instanceof FileList) fileSize = file.item(0)?.size;
      if (file instanceof FileList) fileName = file.item(0)?.name;
      if (file instanceof File) fileSize = file.size;
      if (file instanceof File) fileName = file.name;

      return Boolean(fileSize && fileName);
    })
    .test('isSizeValid', 'File is too big!', (file) => {
      let fileSize;
      if (file instanceof FileList) fileSize = file.item(0)?.size;
      if (file instanceof File) fileSize = file.size;

      return Boolean(!fileSize || (fileSize && fileSize <= 1024 * 5120));
    })
    .test('isExtensionValid', 'Only .jpeg and .png allowed!', (file) => {
      const regExp = /\jpe?g|png$/i;
      let fileExtension;
      if (file instanceof FileList) fileExtension = file.item(0)?.type;
      if (file instanceof File) fileExtension = file.type;

      return Boolean(
        !fileExtension || (fileExtension && regExp.test(fileExtension))
      );
    }),
  country: string().required('you must provide the country to proceed')
});

export type Form = InferType<typeof formSchema>;
export default formSchema;
