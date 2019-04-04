import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(1, 'Username must contain at least 1 character'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  currentPassword: Yup.string()
    .required('Please fill in your current password')
    .min(8, 'Password must contain at least 8 characters'),
  newPassword: Yup.string()
    .min(8, 'New password must contain at least 8 characters'),
  avatar: Yup.string()
})

export default validationSchema