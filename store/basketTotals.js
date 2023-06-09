export const handleEvent = (state, e) =>{
    return {...state, [e.data.userid]:{total:0}}
}