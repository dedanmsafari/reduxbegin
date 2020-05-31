import {combineReducers} from 'redux'
import bugsReducer from './bugs';
import projectsReducer from './projects';
import usersReducer from './users';

export default combineReducers({

    //slices think of it as names to your stores

    bugs:bugsReducer,
    projects:projectsReducer,
    users:usersReducer
})