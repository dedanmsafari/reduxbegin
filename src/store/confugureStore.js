import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from './middleware/logger'
import toast from './middleware/toast'
import func from './middleware/func'
export default function() {
  return  configureStore({
    reducer,
    middleware:[
      ...getDefaultMiddleware(),
      
      func,toast,logger({destination:'console'}),
      ]
  });
}
