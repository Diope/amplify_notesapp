import {SET_NOTES, ADD_NOTE, ERROR, RESET_FORM, SET_INPUT} from './constants.js';

export const initialState = {
    notes: [],
    loading: true,
    error: false,
    form: {name: '', description: ''}
}

export function reducer(state, {type, notes, note}) {
    switch(type) {
        case SET_NOTES:
            return {...state, notes: notes, loading: false }
        case ADD_NOTE:
            return {...state, notes: [note, ...state.notes]}
        case RESET_FORM:
            return {...state, form: initialState.form}
        case SET_INPUT:
                return {...state, form: {...state.form, [action.name]: action.value}}
        case ERROR:
            return {...state, loading: false, error: true }
        default:
            return state
    }
}