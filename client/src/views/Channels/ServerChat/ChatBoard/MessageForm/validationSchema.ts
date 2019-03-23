import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  message: Yup.string()
    .required('Message must contain at least 1 character')
})

export default validationSchema