import {SET_NOTES, ADD_NOTE, ERROR} from './constants.js'

export function reducer(state, {type, notes, note}) {
    switch(type) {
        case SET_NOTES:
            return {...state, notes: notes, loading: false }
        case ADD_NOTE:
            return {...state, notes: [note, ...state.notes]}
        case ERROR:
            return {...state, loading: false, error: true }
        default:
            return state
    }
}