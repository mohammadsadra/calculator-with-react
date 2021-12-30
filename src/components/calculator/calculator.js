import React from 'react';
import Keypad from '../keypad';
import Screen from '../screen';
import s from './calculator.module.css';
import { useState } from 'react'



export default function Calculator() {
  const [data, setData] = useState([0])
  return (
    <div className={s.calculator}>
      <Screen text={data}  />
      <Keypad updateShared={setData} />
    </div>
  );
}
