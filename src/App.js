/* eslint-disable */
import React, {useEffect, useReducer} from 'react';
import {API} from 'aws-amplify'
import {List, Input, Button} from 'antd';
import {v4 as uuid} from 'uuid'

import {listNotes} from './graphql/queries'
import {createNote as CreateNote} from './graphql/mutations'

import {reducer} from './Reduce/index.js'

import 'antd/dist/antd.css'

const initialState = {
  notes: [],
  loading: true,
  error: false,
  form: {name: '', description: ''}
}

const styles = {
  container: {padding: 20},
  input: {marginBottom: 10},
  item: {textAlign: 'left'},
  p: {color: '#1890ff'}
}




function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchNotes()
  }, [])

  async function fetchNotes() {
    try {
      const notesData = await API.graphql({
        query: listNotes
      })
      dispatch({type: 'SET_NOTES', notes: notesData.data.listNotes.items})
    } catch (err) {
      console.log('error: ', err)
      dispatch({type: 'ERROR'})
    }
  }

  function renderItem(item) {
    return (
      <List.Item style={styles.item}>
        <List.Item.Meta
          title={item.name}
          description={item.description}
          />
      </List.Item>
    )
  }


  return (
    <div style={styles.container}>
      <List
        loading={state.loading}
        dataSource={state.notes}
        renderItem={renderItem}
      />
    </div>
  );
}

export default App;
