import React from 'react'
// import moment from 'moment'
import style from './NewsLetter.module.css'

const NewsContent = ({ commits }) => {
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
      <span>
        Hi, welcome to discord-clone. This is a side-project created by me to experiment with
        React's experimental Suspense feature along with apollo hooks. This is strictly for
        experimental and personal use and isn't an exact replica of Discord's webapp. 
        There are lots of features missing so feel free to point them out/contribute and maybe
        I'll try to implement them in the future. 

        The app is built using React + Apollo on the FE; TypeORM and apollo graphql on top of Express for the BE as well as a redis-server to help maintain subscription/live features.
      </span>
      {/* {commits.map(data => {
        return (
          <div key={data.sha} className={style.commit}>
            <time className={style.commitTime}>
              {moment(data.commit.committer.date).format('YYYY-MM-DD')}
            </time>
            <div className={style.commitMessage}>{data.commit.message}</div>
          </div>
        )
      })} */}
    </div>
  )
}

export default NewsContent
