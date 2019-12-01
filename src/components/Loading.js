import React from 'react';
import { c1, c2, c3, div } from '../styles/Loading.module.css';


export default function Loading() {



  return (
    <div className={ div }>
      <span className={ c1 }>.</span>
      <span className={ c2 }>.</span>
      <span className={ c3 }>.</span>
    </div>
  );

}
