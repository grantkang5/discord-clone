import React from 'react'
import { groupBy } from 'lodash'
import style from './UserSettings.module.css'
import classNames from 'classnames'
import { CURRENT_USER } from '../../../../graphql/queries'
import history from '../../../../config/history';

const SettingsNavigation = ({
  items,
  handleSetting,
  selected,
  handleClose
}) => {
  const itemList = groupBy(items, item => item.category)
  const categories = Object.keys(itemList)

  return (
    <div className={style.leftSideBar}>
      <div className={style.scrollerWrap}>
        <div className={style.scroller}>
          <div className={style.navigationWrapper}>
            <div className={style.navigationBar}>
              {categories.map(category => {
                return (
                  <React.Fragment key={category}>
                    <div className={style.header}>{category}</div>
                    {itemList[category].map(item => {
                      const itemStyle = classNames(style.item, {
                        [style.selected]: item.id === selected
                      })
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleSetting(item.id)}
                          className={itemStyle}
                          style={item.style}
                        >
                          {item.label}
                        </div>
                      )
                    })}

                    <hr />
                  </React.Fragment>
                )
              })}

              <div
                className={[style.item, style.logout].join(' ')}
                onClick={() => {
                  history.push('/logout')
                }}
              >
                Log out
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsNavigation
