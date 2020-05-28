// @ts-nocheck
import configureStore from './store/confugureStore';
import {bugAdded,bugResolved,bugAssign, getUnresolvedBugs,getBugsByUser, loadBugs, addBug,resolveBug, assignBugToUser} from './store/bugs';
import { projectAdded } from './store/projects'
import { userAdded } from './store/users'
import * as actions from './store/api'
const store = configureStore();



store.dispatch(loadBugs());
setTimeout(() =>store.dispatch(assignBugToUser(1, 4)),2000)
// store.dispatch(addBug({description: 'A new Bug is seen'}));
// @ts-ignore



// store.dispatch({
//         type: "apiCallBegan",
//         payload: {
//           url: '/bugs',
//           onSuccess: "bugsReceived",
//           onError: "apiRequestFailed"
//         }
//       });
// store.dispatch(userAdded({ name:"Susan React"}));
// store.dispatch(userAdded({ name:"Martin Lawrence"}));
// store.dispatch(projectAdded({ name: 'Project 1'}));
// store.dispatch(bugAdded({description: 'Public one'}));
// store.dispatch(bugAdded({description: 'Public two'}));
// store.dispatch(bugAdded({description: 'Public three'}));
// store.dispatch(bugResolved({id: 1 }));
// store.dispatch(bugAssign({bugId: 1, userId: 1}));
// store.dispatch(bugAssign({bugId: 3, userId: 2}));


// const unresolvedBugs = getUnresolvedBugs(store.getState());
//  const bugsbyuser = getBugsByUser(2)(store.getState())
// // console.log(unresolvedBugs);
// // console.log(bugsbyuser);

