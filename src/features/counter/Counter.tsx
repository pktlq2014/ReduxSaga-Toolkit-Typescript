import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
  incrementSaga,
} from './counterSlice';
import styles from './Counter.module.css';
import cityApi from 'api/cityApi';
import studentApi from 'api/studentApi';

export function Counter() {
  // count và count1 tương đương nhau
  const count = useAppSelector(selectCount);
  const count1 = useAppSelector((state) => state.counterSlice.value);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;
  const getAllStudent = async () => {
    try {
      // dispatch({ type: ACTION.LOADING, data: true })
      const res = await studentApi.getAll({ _limit: 10, _page: 1, _order: 'asc', _sort: '' });
      console.log(res);
      // if (res.status === 200) {
      // }
      // res.data.forEach((values, index) => {
      //   if(values.)
      // })
      //dispatch({ type: ACTION.LOADING, data: false })
    } catch (error) {
      console.log(error);
      //dispatch({ type: ACTION.LOADING, data: false })
    }
  };
  useEffect(() => {
    getAllStudent();
  }, []);
  const getAllCity = async () => {
    try {
      // dispatch({ type: ACTION.LOADING, data: true })
      const res = await cityApi.getAll();
      console.log(res);
      // if (res.status === 200) {
      // }
      // res.data.forEach((values, index) => {
      //   if(values.)
      // })
      //dispatch({ type: ACTION.LOADING, data: false })
    } catch (error) {
      console.log(error);
      //dispatch({ type: ACTION.LOADING, data: false })
    }
  };
  useEffect(() => {
    getAllCity();
  }, []);
  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        {/* <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button> */}
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementSaga(incrementValue))}
        >
          Add Async
        </button>
        <button className={styles.button} onClick={() => dispatch(incrementIfOdd(incrementValue))}>
          Add If Odd
        </button>
      </div>
    </div>
  );
}
