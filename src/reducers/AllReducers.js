import { combineReducers } from 'redux';
import clientDataReducer from './getDataReducer'
import editModeReducer from './editModeReducer'

const allReducers = combineReducers({
    clientformdata : clientDataReducer,
    editmode : editModeReducer
})

export default allReducers