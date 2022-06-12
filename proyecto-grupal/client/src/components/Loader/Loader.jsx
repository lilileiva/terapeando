import React from 'react'
import style from './Loader.module.css'

export default function Loader() {
  return (
    <div className={style.container}>
      <div className={style.spinner}></div>
      <h3 className={style.loading}>🔍​ Un momento...</h3>
    </div>
  )
}