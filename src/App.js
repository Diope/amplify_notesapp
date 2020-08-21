import React, {useEffect, useReducer} from 'react';
import {API} from 'aws-amplify'
import {List} from 'antd';
import {listNotes} from './graphql/queries'

import 'antd/dist/antd.css'
import './App.css';

const initialState = {
  notes: [],
  loading: true,
  error: false,
  form: {name: '', description: ''}
}

function reducer(state, action) {
  switch({type, notes}) {
    case 'SET_NOTES':
      return {...state, notes: notes, loading: false }
    case 'ERROR':
      return {...state, loading: false, error: true }
    default:
      return state
  }
}

function App() {
  return (
    <div>
      
    </div>
  );
}

export default App;
