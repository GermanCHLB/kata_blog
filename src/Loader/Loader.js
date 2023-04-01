import React from 'react'
import { Spin } from 'antd'

import classes from './Loader.module.scss'

const Loader = () => {
  return (
    <div className={classes.Loader}>
      <Spin />
    </div>
  )
}

export default Loader
