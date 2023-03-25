import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { legacy_createStore as createStore} from 'redux'


const initialState = {
  taskInput : '',
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
    case 'UPDATE_TASK_INPUT':
      return {
        ...state,
        taskInput : action.payload.taskInput
      }
    default:
      return state;
  }
}

/**
 * Action creator, ユーザーからのAction を生成する。
 * Action は reducer で利用する。
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

const updateTaskInput = (taskInput) => (
  {
    type : 'UPDATE_TASK_INPUT',
    payload : {
      taskInput
    }
  }
);

/**
 * store, アプリケーションで唯一であり、すべての情報を集約する。
 */
const store = createStore(tasksReducer);


// store へのアクセスは dispatch に Action を渡す。
store.dispatch(addTask('初期：猫にごはんをあげる。'));
// getState で中身を確認する。
console.log(store.getState());


/**
 * Todo App の画面を定義する。
 * @param {*} param0 
 * @returns 
 */
const TodoApp = ({store}) => {
  const {taskInput, tasks} = store.getState();
  return (
    <div class='main'>
      <h1>ToDo App</h1>
      <input type='text' onChange={(e) => store.dispatch(updateTaskInput(e.target.value))} />
      <button onClick={() => store.dispatch(addTask(taskInput))} >追加</button>
      <ul>
        {
          tasks.map((item, i) => {
            return <li key={i}>{item}</li>
          })
        }
      </ul>
    </div>
  )
}


// React のレンダリング先を定義する。
const root = ReactDOM.createRoot(document.getElementById('root'));
/**
 * TodoApp の 描画を開始する。
 * @param {*} store 
*/
const renderApp = (store) => {
  root.render (
    <TodoApp store = {store}/>
  )
}

// store の更新が完了した後に行う処理(再描画)
// react-redux ライブラリ無しなので、こちらを利用する
store.subscribe(() => renderApp(store));

// 初期描画開始
renderApp(store);
