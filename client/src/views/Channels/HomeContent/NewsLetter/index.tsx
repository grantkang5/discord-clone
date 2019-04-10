import React, { useEffect, useState } from 'react'
import axios from 'axios'
import style from './NewsLetter.module.css'
import NewsContent from './NewsContent'

const NewsLetter = () => {
  const [commits, handleCommits] = useState(null)
  useEffect(() => {
    axios
      .get('https://api.github.com/repos/grantkang5/discord-clone/commits')
      .then(({ data }) => {
        handleCommits(data)
      })
  }, [])

  return (
    <div className={style.container}>
      <div className={style.titleWrapper}>
        <div className={style.titleContainer}>
          <div className={style.title}>Welcome to discord</div>
        </div>
      </div>

      {commits && <NewsContent commits={commits} />}
    </div>
  )
}

export default NewsLetter
