import React from 'react'
import HomeChannels from './HomeChannels'
import HomeHeader from './HomeHeader';
import UserContent from '../UserContent';
import style from './HomeContent.module.css';

const HomeContent = () => (
  <React.Fragment>
    <div className={style.channelsBox}>
      <HomeHeader />
      <HomeChannels />

      <UserContent />
    </div>
  </React.Fragment>
)

export default HomeContent