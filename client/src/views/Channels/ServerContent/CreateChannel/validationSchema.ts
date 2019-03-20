import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  channel: Yup.string()
    .required('Channel name is required')
})

export default validationSchema