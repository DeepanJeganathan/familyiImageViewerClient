import { FETCH_MEMBERS_FAIL, FETCH_MEMBERS_REQUEST, FETCH_MEMBERS_SUCCESS, POST_FAIL, POST_SUCCESS } from "./memberTypes"
import axios from 'axios'

const url= "https://localhost:44330/api/FamilyImageViewer/"

export const fetch_members_request=()=>{
    return{
        type:FETCH_MEMBERS_REQUEST
    }
}

export  const fetch_members_success=(data)=>{
    return{
        type:FETCH_MEMBERS_SUCCESS,
        payload:data
    }
}

export const fetch_members_fail=(errorMsg)=>{
    return{
        type:FETCH_MEMBERS_FAIL,
        payload:errorMsg
    }
}
    

export const fetch_members=()=>{
    return (dispatch)=>{

        dispatch(fetch_members_request());
        axios.get(url).then(res=>dispatch(fetch_members_success(res.data)))
        .catch(err=>dispatch(fetch_members_fail(err.msg)));

    }
}


export const post_success=()=>{
    return {
        type:POST_SUCCESS
    }
}

export const post_fail=(errMsg)=>{
    return {
        type:POST_FAIL,
        payload:errMsg
    }
}

export const post=(data)=>{

    return (dispatch)=>{
axios.post(url,data).then(res=> dispatch(post_success()))
.catch(err=>dispatch(post_fail(err.msg)))
dispatch(fetch_members());

    }
    

}