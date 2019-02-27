import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { FormikProps } from 'formik'
import classNames from 'classnames'

import style from './FormInput.module.css'

const FormInput = ({ formikProps, ...inputProps }) => {
  const { handleChange, handleBlur, values } = formikProps
  const { name } = inputProps

  const touched = formikProps.touched[name]
  const error = formikProps.errors[name]

  const inputClass = classNames(style.inputField, {
    [style.touched]: touched && !error,
    [style.error]: touched && error
  })

  const labelClass = classNames(style.inputLabel, {
    [style.error]: touched && error
  })

  return (
    <div className="inputContainer">
      {inputProps.label && (
        <label className={labelClass}>
          {inputProps.label}
          {touched && error && <span>{' '}- {error}</span>}
        </label>
      )}
      <div className={style.inputWrapper}>
        <input
          className={inputClass}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values[name]}
          {...inputProps}
        />
      </div>
    </div>
  )
}

export default FormInput
