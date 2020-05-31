import { createSlice } from "@reduxjs/toolkit";
//Action types
let lastId = 0;
//automatically create action types and action creators
//it calls create action and create reducer
const slice = createSlice({
    name:'projects',
    initialState:[],
    reducers:{
        // action => action handler
        projectAdded: (projects, action) => {
            projects.push({
              id: ++lastId,
              name: action.payload.name
            });
          },
        //   bugResolved: (bugs,action) => {
        //     const index =  bugs.findIndex(bug=> bug.id === action.payload.id);
        //     bugs[index].resolved = true
        //  },
        //  bugRemoved: (bugs,action) =>{
        //      bugs.filter( bug => bug.id !== action.payload.id)
        //  }   
    }
})

export const { projectAdded  } = slice.actions
export default slice.reducer;

// console.log(slice);

//Action creators


//Reducers



//  