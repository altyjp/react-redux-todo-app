import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { legacy_createStore as createStore} from 'redux'

const initialState = {
  tasks: []
}

/**
 * Reducer, Redux で管理している store(後述) を変化させるための関数
 * Action を受け取る。
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const tasksReducer = (state = initialState, action) => {
  switch(action.type){
    case 'ADD_TASK':
      return {
        ...state,
        tasks : state.tasks.concat([action.payload.task])
      };
    default:
      return state;
  }
}

/**
 * Action creator, Action を生成する。
 * Action のテストを行いやすくする効果もある。
 * @param {*} task 
 * @returns 
 */
const addTask = (task) => (
  // これがアクションオブジェクト
  {
    type: 'ADD_TASK',
    payload: {
      task
    }
  }
);

/**
 * store, アプリケーションで唯一であり、すべての情報を集約する。
 */
const store = createStore(tasksReducer);

// store へのアクセスは dispatch に Action を渡す。
store.dispatch(addTask('猫にごはんをあげる。'));

// getState で中身を確認する。
console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
