import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { legacy_createStore as createStore} from 'redux'
import { connect, Provider } from 'react-redux';


/**
 * 画面で利用するパラメータの初期値定義
 */
const initialState = {
  taskInput : '', // Todo の テキスト入力欄を定義する
  tasks: [] // 入力した Todoを保持する配列
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

// redux の基本
// store へのアクセスは dispatch に Action を渡す。
store.dispatch(addTask('初期：猫にごはんをあげる。'));
// getState で中身を確認する。
console.log(store.getState());


/**
 * Presentational Component,
 * Todo App の画面を定義する。
 * react-redux の効果により、外部から値を受け取るだけで動作するようになった。
 * @param {*} param0 
 * @returns 
 */
const TodoApp = ({
  tasks,
  taskInput,
  updateTaskInputInContainer,
  addTaskInContainer
}) => {

  return (
    <div className='main'>
      <h1>ToDo App</h1>
      <input type='text' onChange={(e) => updateTaskInputInContainer(e.target.value)} />
      <button onClick={() => addTaskInContainer(taskInput)} >追加</button>
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

/**
 * react-redux ライブラリ編
 * Container component, TodoApp の画面と state, dispatch を紐づける
 */
// store -> 画面, 画面で利用するパラメータの map
const mapStateToProps = ({taskInput, tasks}) => {
  return {taskInput, tasks};
}

// 画面 -> store, 画面からstoreを更新するためのmap
const mapDispatchToProps = (dispatch) => {
  return {
    addTaskInContainer(task) {
      dispatch(addTask(task));
    },
    updateTaskInputInContainer(taskInput) {
      dispatch(updateTaskInput(taskInput));
    }
  }
}
// connect関数で mapStateToProps, mapDispatchToProps を TodoApp に紐づける
// DIっぽいように見える
const TodoAppContainer = connect(mapStateToProps, mapDispatchToProps)(TodoApp);


// React のレンダリング先を定義する。
const root = ReactDOM.createRoot(document.getElementById('root'));
/**
 * TodoApp の 描画を開始する。
 * @param {*} store 
*/
const renderApp = (store) => {
  root.render (
    <Provider store={store} >
      <TodoAppContainer />
    </Provider>
  )
}

// 初期描画開始
renderApp(store);
