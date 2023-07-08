import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
function App() {
  const ref = useRef(null)
  const ref1 = useRef(null)
  const [height, setHeight] = useState(0)
  const [count, setCount] = useState(0);
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false)
  const [offsetTop, setOffsetTop] = useState(null)
  const antPicker = document.querySelector('.ant-picker')


  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') >= 7;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 7;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open) => {
    setIsOpen(open)
    console.log(ref.current.offsetWidth)
    console.log(ref.current.offsetHeight)
    console.log('offsettop of div', ref.current.offsetTop)
    console.log('scrolltop of div', ref.current.scrollTop)
    console.log(window.innerWidth)
    console.log(window.innerHeight)
    console.log(screen.width)
    console.log(screen.height)
    console.log(open)
    setOffsetTop(antPicker.offsetTop + antPicker.clientHeight)
    if(screen.width < 480) {
      document.querySelector('.ant-picker-panels').style['flex-direction'] = 'column'
      document.querySelector('.ant-picker-panels').style.overflow = 'auto'
      document.querySelector('.ant-picker-panels').style.height = (ref.current.offsetWidth+20) + 'px'
    }
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  // useLayoutEffect(() => {
  //   console.log(isOpen, ref.current)
  //   if(isOpen && ref.current) {
  //     console.log("vô tới đây rồi nè")
  //     document.querySelector('.ant-picker-dropdown').style.top = '100px'
  //     const hai_test = document.querySelector('.hai_test').style.top
  //     console.log(hai_test)
  //   }
  // })

  useEffect(() => {
    // console.log(isOpen, ref.current)
    // if(isOpen && ref.current) {
    //   console.log("vô tới đây rồi nè")
    //   document.querySelector('.ant-picker-dropdown').style.top = '100px'
    //   const hai_test = document.querySelector('.ant-picker-dropdown').style.top
    //   console.log(hai_test)
    // }
    setHeight(ref1.current.clientHeight)
  })

  const handler = (event) => {
    // console.log("active")
    const root = document.querySelector("html")
    console.log(root.scrollTop)
    setClientHeight(root.clientHeight)
    setScrollTop(root.scrollTop)
  }

  return (
    <div ref = {ref1}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div ref = {ref}>
        <RangePicker
        // style= {{height: "auto", width: "auto",}}
        value={dates || value}
        disabledDate={disabledDate}
        onCalendarChange={(val) => {
          console.log('onCalendarChange-val', val)
          console.log('onCalendarChange-date', dates)
          console.log('onCalendarChange-value', value)
          setDates(val);
        }}
        onChange={(val) => {
          console.log('onChange-val', val)
          console.log('onChange-value', value)
          console.log('onChange-date', dates)
          setValue(val);
        }}
        onOpenChange={onOpenChange}
        changeOnBlur
        popupStyle = {{top: offsetTop}}
        />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          height of div ref 1 is {height}
          <br />
          scrollTop is {scrollTop}
          <br />
          client Height of html is {clientHeight}
          {
            document.addEventListener("scroll", handler)
          }
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
