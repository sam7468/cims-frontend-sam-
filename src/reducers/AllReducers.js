import { combineReducers } from 'redux';
import clientDataReducer from './getDataReducer'
import editModeReducer from './editModeReducer'
import getAddressReducer from './getAddress';

const allReducers = combineReducers({
    clientformdata : clientDataReducer,
    editmode : editModeReducer,
    getaddress : getAddressReducer
})

export default allReducers