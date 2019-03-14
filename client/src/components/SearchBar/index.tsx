import React from 'react'
import style from './SearchBar.module.css'
import Search from '@material-ui/icons/Search'

const SearchBar = (inputProps) => {
  return (
    <div className={style.container}>
      <div className={style.inner}>
        <input className={style.input} {...inputProps} />
        <Search className={style.searchBarIcon} />
      </div>
    </div>
  )
}

export default SearchBar