// @ts-nocheck
import {
  createSlice,
  createSelector,
  bindActionCreators
} from "@reduxjs/toolkit";
import {
  apiCallBegan
} from "./api";
import moment from "moment";

//Action types

//automatically create action types and action creators
//it calls create action and create reducer
const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugAdded: (bugs, action) => {
      // @ts-ignore
      bugs.list.push(action.payload);
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },
    bugAssigned: (bugs, action) => {
      const {
        id: bugId,
        userId
      } = action.payload;
      const index = bugs.list.findIndex(bug => bug.id === bugId);
      bugs.list[index].userId = userId;
    }
  }
});
export const {
  bugAdded,
  bugResolved,
  bugAssigned,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed
} = slice.actions;
export default slice.reducer;

//Action Creators
const url = "/bugs";
// @ts-ignore
// export const loadBugs = () => apiCallBegan({
//   url,
//   onStart: bugsRequested.type,
//   onSuccess: bugsReceived.type,
//   onError: bugsRequestFailed.type
//   // onError: actions.apiCallFailed.type
// })
//command -> (event)
export const addBug = bug => apiCallBegan({
  url,
  method: "post",
  data: bug,
  onSuccess: bugAdded.type
})

// @ts-ignore
export const resolveBug = id => apiCallBegan({

  url: url + '/' + id,
  method: "patch",
  data: {
    resolved: true
  },
  onSuccess: bugResolved.type

})

export const assignBugToUser = (bugId, userId) => apiCallBegan({

  url: url + '/' + bugId,
  method: "patch",
  data: {
    userId
  },
  onSuccess: bugAssigned.type

})


export const loadBugs = () => (dispatch, getState) => {
  const {
    lastFetch
  } = getState().entities.bugs;
  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
  if (diffInMinutes < 10) return;
  return dispatch(
    // @ts-ignore
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type
      // onError: actions.apiCallFailed.type
    })
  );
};

//Selector
//Always returning a computed state.

// export const getUnresolvedBugs = state => state.entities.bugs.filter(bug => !bug.resolved)
export const getUnresolvedBugs = createSelector(
  state => state.entities.bugs,
  (bugs) => bugs.list.filter(bug => !bug.resolved)
);

export const getBugsByUser = userId =>
  createSelector(
    state => state.entities.bugs,
   bugs => bugs.list.filter(bug => bug.userId === userId)
  );