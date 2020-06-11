import {USER_SIGNIN_REQUEST,USER_SIGNIN_SUCCESS,USER_SIGNIN_FAIL,
        USER_REGISTER_REQUEST ,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL,USER_LOGOUT} from '../constants/userConstantes'

import axios from 'axios';
import Cookie from 'js-cookie';


const userSigninAction = (email,password) => async (dispatch,getState) => {

    try {
        dispatch({type: USER_SIGNIN_REQUEST ,payload:{loading: true}});

        const {data} = await  axios.post('http://127.0.0.1:5000/api/users/connexion/',{email,password});

        console.log("la data")
        console.log(data)

        dispatch({type: USER_SIGNIN_SUCCESS ,payload:data});

       //const {cardReducer : {shoppingItems}} =  getState();
       Cookie.set("userInfo", JSON.stringify(data));
        
    } catch (error) {
        console.log(error.message)
        dispatch({type: USER_SIGNIN_FAIL ,payload:error.message });
        
    }

}

const userRegisterAction = (name,email,password) => async (dispatch,getState) => {

    try {
        dispatch({type: USER_REGISTER_REQUEST ,payload:{loading: true}});

        const {data} = await  axios.post('http://127.0.0.1:5000/api/users/inscription/',{name,email,password});

        console.log("la data")
        console.log(data)

        dispatch({type: USER_REGISTER_SUCCESS ,payload:data});
       //const {cardReducer : {shoppingItems}} =  getState();
       Cookie.set("userInfo", JSON.stringify(data));
        
    } catch (error) {
        console.log(error.message)
        dispatch({type: USER_REGISTER_FAIL ,payload:error.message });
        
    }

}

const userLogoutAction = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: USER_LOGOUT })
  }



export {userSigninAction,userRegisterAction,userLogoutAction};