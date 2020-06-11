import React,{useState,useEffect} from 'react';
import {Link,useParams,useHistory,} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

import {userSigninAction,userRegisterAction} from '../actions/userAuthActions';

import './signin.css';

const SignUp = () => {
    const userAuthReducer = useSelector(state => state.userAuthReducer);
    const {userInfo , loading , error} = userAuthReducer;
    const dispatch = useDispatch();
    const history = useHistory();

    const { redirect } = useParams();

    const [inputsValue,setInputsValue] = useState({name:"Moussa",email: "moussa@gmail.com",password:"1234",rePassword:"1234"})

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
        
        const {name,email,password,rePassword} = inputsValue;

        console.log(name,email,password,rePassword);

        dispatch(userRegisterAction(name,email,password));
        
        setInputsValue({name:"",email:"",password:"",rePassword:""});

    }
    return <div className="body">
        <form onSubmit={formSubmitHandler} className="form-signin text-center">
        <img className="mb-4" src="https://logos.textgiraffe.com/logos/logo-name/Richard-designstyle-boots-m.png" alt="" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Inscription </h1>

        {loading ? <h4>Chargement ....</h4> : error ? <h4>{error}</h4> : userInfo ? <h4>{userInfo.email}</h4> : <h1>Non Inscrit</h1>}

        <label htmlFor="inputName" className="sr-only">Nom </label>
        <input value={inputsValue.name} onChange={updateInputsValueHandler} name="name" type="text" id="inputName" className="form-control" placeholder="Nom" required autoFocus />
        
        
        <label htmlFor="inputEmail" className="sr-only">Adresse Email</label>
        <input value={inputsValue.email} onChange={updateInputsValueHandler} name="email" type="email" id="inputEmail" className="form-control" placeholder="Adresse Email" required  />
        
        <label htmlFor="inputPassword" className="sr-only">Mot de passe</label>
        <input value={inputsValue.password} onChange={updateInputsValueHandler} name="password" type="password" id="inputPassword" className="form-control" placeholder="Mot de passe" required />
        
        <label htmlFor="inputRepassword" className="sr-only">Retapez le mot de passe</label>
        <input value={inputsValue.rePassword} onChange={updateInputsValueHandler} name="rePassword" type="password" id="inputRepassword" className="form-control" placeholder="Entrer à nouveau de passe" required />
        
        
        
        <div className="checkbox mb-3">
            <label>
            <input type="checkbox" value="remember-me" /> Se souvenir de moi
            </label>

        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Inscription</button>
        <p className="mt-5 mb-3 text-muted">&copy; 2019-2020</p>
        </form>
    </div>;
}


export default SignUp;