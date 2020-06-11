import React , {useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {useSelector,useDispatch} from 'react-redux'
import {userAuthReducer} from '../reducers/userAuthReducer';



const Profil = () => {
    const userAuthReducer = useSelector(state => state.userAuthReducer);
    const {userInfo , loading , error} = userAuthReducer;
    const dispatch = useDispatch();


    return <div>
        <h1>Nom : {userInfo.name} </h1>
        <h1>Email : {userInfo.email} </h1>
        <h1>IsAdmin  : {userInfo.isAdmin? "Oui" : "Non"} </h1>
    </div>
}


export default Profil;