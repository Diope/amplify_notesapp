/* eslint-disable */
import React, {useEffect, useReducer} from 'react';
import {API} from 'aws-amplify'
import {List, Input, Button} from 'antd';
import {v4 as uuid} from 'uuid'

import {listNotes} from './graphql/queries'
import {createNote as CreateNote} from './graphql/mutations'

import {reducer, initialState} from './Reduce/index.js'

import 'antd/dist/antd.css'
import { RESET_FORM, SET_INPUT } from './Reduce/constants';

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

  async function createNote() {
    const {form} = state
    if (!form.name || !form.description) {
      return alert('Please Enter a name and description')
    }
    const note = {...form, clientId: CLIENT_ID, complete: false, id: uuid()}
    dispatch({type: ADD_NOTE, note})
    dispatch({type: RESET_FORM })
    try {
      await API.graphql({
        query: CreateNote,
        variables: {input: note}
      })
      console.log('Successfully created note!')
    } catch (err) {
      console.log("error: ", err)
    }
  }

  function onChange(e) {
    dispatch({type: SET_INPUT, name: e.target.name, value: e.target.value})
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
      <Input
        onChange={onChange}
        value={state.form.name}
        placeholder="Note Title"
        name='name'
        style={styles.input}
      />
      <Input
        onChange={onChange}
        value={state.form.description}
        placeholder="Note Description"
        name='description'
        style={styles.input}
      />
      <Button
        onClick={createNote}
        type="primary"
      >Create Note</Button>

      <List
        loading={state.loading}
        dataSource={state.notes}
        renderItem={renderItem}
      />
    </div>
  );
}

export default App;
