import React from 'react';
import classes from './Loader.module.scss'
import {Spin} from "antd";
const Loader = () => {
  return (
    <div className={classes.Loader}>
      <Spin/>
    </div>
  );
};

export default Loader;