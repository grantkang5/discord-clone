import React from 'react'
import moment from 'moment'
import style from './NewsLetter.module.css'

const NewsContent = ({ commits }) => {
  console.log(commits)
  return (
    <div className={style.newsContainer}>
      <span className={style.repo}>
        Repo:{' '}
        <a
          href="https://github.com/grantkang5/discord-clone"
        >
          https://github.com/grantkang5/discord-clone
        </a>
      </span>
      {commits.map(data => {
        return (
          <div key={data.sha} className={style.commit}>
            <time className={style.commitTime}>
              {moment(data.commit.committer.date).format('YYYY-MM-DD')}
            </time>
            <div className={style.commitMessage}>{data.commit.message}</div>
          </div>
        )
      })}
    </div>
  )
}

export default NewsContent
