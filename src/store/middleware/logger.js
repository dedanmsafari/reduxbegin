const logger = param => store => next => action => {
     console.log("logging",param);
    //  console.log("next",next);
    //  console.log("action",action);
    return  next(action)
}
export default logger;