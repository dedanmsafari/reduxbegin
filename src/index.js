import store from "./store";
import { bugAdded, bugResolved} from "./actionCreators"

store.dispatch(bugAdded('A beginner'))
store.dispatch(bugResolved(1))
// store.dispatch({
//     type: actions,
//     payload: {
//       id: 1
//     }
// })

console.log(store.getState());