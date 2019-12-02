import React from 'react';
import { c1, c2, c3, div } from '../styles/Loading.module.css';

export default function Loading() {

  return (
    <div className={ div }>
      <div className={ c1 }></div>
      <div className={ c2 }></div>
      <div className={ c3 }></div>
    </div>
  );

}
