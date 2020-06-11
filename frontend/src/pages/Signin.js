import React,{useState,useEffect} from 'react';
import {Link,useParams,useHistory,} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

import {userSigninAction} from '../actions/userAuthActions';

import './signin.css';

const Signin = () => {
    const userAuthReducer = useSelector(state => state.userAuthReducer);
    const {userInfo , loading , error} = userAuthReducer;
    const dispatch = useDispatch();
    const history = useHistory();

    const { redirect } = useParams();

    const [inputsValue,setInputsValue] = useState({email: "richard.bathiebo.7@gmail.com",password:"1234"})

    useEffect(() => {

        if(userInfo){
            //const {email} = userInfo._doc
            //alert(email);
            console.log(userInfo)
            redirect && history.push(redirect)
            history.push('/')
            
        }

    },[userInfo])
    const updateInputsValueHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputsValue(prevValue => {
            return {...prevValue,[name]:value}
        })
    }
    const formSubmitHandler = (e) => {
        e.preventDefault();
        
        const {email,password} = inputsValue;
        console.log(email,password);

        dispatch(userSigninAction(email,password));
        setInputsValue({email:"",password:""})
    }
    return <div className="body">
        <form onSubmit={formSubmitHandler} className="form-signin text-center">
        <img className="mb-4" src="https://logos.textgiraffe.com/logos/logo-name/Richard-designstyle-boots-m.png" alt="" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Connexion </h1>

        {loading ? <h4>Chargement ....</h4> : error ? <h4>{error}</h4> : userInfo ? <h4>{userInfo.email}</h4> : <h1>Non Connecté</h1>}

        
        <label htmlFor="inputEmail" className="sr-only">Adresse Email</label>
        <input value={inputsValue.email} onChange={updateInputsValueHandler} name="email" type="email" id="inputEmail" className="form-control" placeholder="Adresse Email" required autoFocus />
        <label htmlFor="inputPassword" className="sr-only">Mot de passe</label>
        <input value={inputsValue.password} onChange={updateInputsValueHandler} name="password" type="password" id="inputPassword" className="form-control" placeholder="Mot de passe" required />
        <div className="checkbox mb-3">
            <label>
            <input type="checkbox" value="remember-me" /> Se souvenir de moi
            </label>

        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Connexion</button>
        <Link to="/inscription">Pas inscrit ? Inscrivez vous !</Link>
        <p className="mt-5 mb-3 text-muted">&copy; 2019-2020</p>
        </form>
    </div>;
}


export default Signin;