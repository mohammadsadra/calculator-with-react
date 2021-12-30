import React from 'react';
import s from './keypad.module.css';
import Button from '../button';
import cx from 'classnames';

let ans = 0;
let screen = 0;
let func = '';
let isDelete = false;

const cal = (func, n1 = 0, n2 = 0) => {
  if (func === '%') {
    if(n2 == 0){
      alert('You can`t devide by ZERO');
      ans = 0;
      isDelete = false
      screen = 0
      return 0;
    }
    return n1 % n2
  } else if (func === '÷') {
    if(n2 == 0){
      alert('You can`t devide by ZERO');
      ans = 0;
      isDelete = false
      screen = 0
      return 0;
    }
    return n1 / n2
  }else if (func === '+') {
    return parseFloat(n1) + parseFloat(n2)
  } else if (func === '-') {
    return n1 - n2
  } else if (func === 'x') {
    
    if(parseFloat(n1) === 0.0 && parseFloat(n2) === 0.0) {
      console.log('im in');
      return 0;
    }
    return parseFloat(n1) * parseFloat(n2)
  } 
}

export default function Keypad({updateShared}) {
  const handleButtonClick = (button) => {
    console.log(button);
    if (func != '' && !isDelete) {
      ans = screen
      updateShared(0)
      screen = 0
      isDelete = true  
    }
    console.log('*********');
      console.log(screen);
      console.log(typeof screen);
    console.log('********');
    if (button === 'C' || isNaN(screen)) {
      updateShared(0);
      ans = 0;
      isDelete = false
      screen = 0
    } else if (button === '+/-') {
      if(screen !=  0) {
        screen = screen * -1
        if(func === ''){
          ans = screen
        }
        updateShared(screen)
      }
    } else if (button === '%') {
      if(isDelete) {
        ans = cal(func, ans, screen)
        screen = ans
        updateShared(screen)
        isDelete = false
      }
      func = '%'
    } else if (button === '÷') {
      if(isDelete) {
        ans = cal(func, ans, screen)
        screen = ans
        updateShared(screen)
        isDelete = false
      }
      func = '÷'

    }else if (button === '+') {
      if(isDelete) {
        ans = cal(func, ans, screen)
        screen = ans
        updateShared(screen)
        isDelete = false
      }
      func = '+'

    } else if (button === '-') {
      if(isDelete) {
        ans = cal(func, ans, screen)
        screen = ans
        updateShared(screen)
        isDelete = false
      }
      func = '-'
    } else if (button === 'x') {
      if(isDelete) {
        ans = cal(func, ans, screen)
        screen = ans
        updateShared(screen)
        isDelete = false
      }
      func = 'x'
    } else if (button === '.') {
      screen = screen +  button
        updateShared(screen)
    }else if (button === '=') {
      ans = cal(func, ans, screen)  
      screen = ans
      updateShared(screen)
      isDelete = false
      func = ''    
    } else {    
      console.log(screen);
      if ((parseFloat(screen) === 0|| screen ===  '') && button == 0) {
        screen = 0  
      } else if(screen === 0 && button !== 0){
        screen = button
        updateShared(button)
      } else if(screen !== 0 && button !== 0) {
        screen = screen +  button
        updateShared(screen)
      }
      
    }  
    
    
  };

  const buttons = [
    { text: 'C', isDark: true },
    { text: '+/-', isDark: true },
    { text: '%', isDark: true },
    { text: '÷', isDark: true },
    { text: '7' },
    { text: '8' },
    { text: '9' },
    { text: 'x', isDark: true },
    { text: '4' },
    { text: '5' },
    { text: '6' },
    { text: '-', isDark: true },
    { text: '1' },
    { text: '2' },
    { text: '3' },
    { text: '+', isDark: true },
    { text: '0', isLarge: true },
    { text: '.' },
    { text: '=', isDark: true },
  ];

  return (
    <div className={s.keypad}>
      {buttons.map((button) => (
        <Button
          key={button.text}
          text={button.text}
          onClick={handleButtonClick}
          className={cx(
            button.isLarge && s['button-2x'],
            button.isDark && s.dark,
          )}
        />
      ))}
    </div>
  );
}
