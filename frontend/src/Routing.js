import React , {useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import HomePage from './pages/Home';
import ShopItemPage from './pages/ShopItem';
import ShoppingCardPage from './pages/ShoppingCard';
import SignIn from './pages/Signin';
import {useSelector,useDispatch} from 'react-redux'



import {userAuthReducer} from './reducers/userAuthReducer';
import SignUp from "./pages/Singup";
import Profil from "./pages/Profil";

import ProductCrud from './pages/crud_product/Products'

import {userLogoutAction} from './actions/userAuthActions'

import {cardNumberItemsAction} from './actions/cardActions'

import cardReducer from './reducers/cardReducer';


export default function RoutingComponent() {
    const userAuthReducer = useSelector(state => state.userAuthReducer);
    const {userInfo , loading , error} = userAuthReducer;

    const dispatch = useDispatch();

    const history = useHistory();


    const cardReducer = useSelector(state => state.cardReducer);
    const {numberOfItems} = cardReducer;

    const {shoppingItems} = cardReducer;
    const getNumberOfItemsInShoppingCard = () => {
      let result = 0;

      if (shoppingItems){
        shoppingItems.map(value => result+= Number(value.qte) )
      }
      return result
    }

  useEffect(() => {
    // dispatch(cardNumberItemsAction());
  }, [shoppingItems])

   
    const signOutHandler = (e) => {
      e.preventDefault();
      dispatch(userLogoutAction());

      document.location = "/";

    }


    return (
      <Router>
        <div>

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">Richard Ecommerce {numberOfItems} </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
        
          <li className="nav-item active">
            <Link className="nav-link" to="/">Accueil</Link>
          </li>

          <li className="nav-item ">
          {shoppingItems && <span class="badge badge-pill badge-primary" style={{float:'left',marginBottom:-10}}> {getNumberOfItemsInShoppingCard()} </span>  }
          

            <Link className="nav-link" to="/shoppingcart">Panier</Link>
          </li>

          {userInfo && <li className="nav-item ">
            <Link className="nav-link" to="/profil">{userInfo.name}</Link>
          </li> }

          {userInfo && <li className="nav-item">
            <Link className="nav-link" onClick={signOutHandler}>Déconnexion</Link>
          </li> }

          {!userInfo &&  <li className="nav-item ">
            <Link className="nav-link" to="/connexion">Connexion</Link>
          </li> }

          {userInfo && userInfo.isAdmin && <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Admin
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item"> Utilisateurs</Link>
          <div class="dropdown-divider"></div>

          <Link to="admin/produits" className="dropdown-item">Produits</Link>

        </div>
      </li>}

        
            
        </ul>
      </div>
    </div>
        </nav>


        <Switch>
                <Route exact={true} path="/">
                  <HomePage />
                </Route>
                <Route path="/shopitem/:id">
                  <ShopItemPage />
                </Route>
                <Route exact={true} path="/shoppingcart/:productId?">
                  <ShoppingCardPage />
                </Route>
                <Route exact={true} path="/connexion">
                  <SignIn />
                </Route>
                <Route exact={true} path="/inscription">
                  <SignUp />
                </Route>

                <Route exact={true} path="/profil">
                  <Profil />
                </Route>

                <Route exact={true} path="/admin/produits">
                  <ProductCrud />
                </Route>

          </Switch>



      <footer className="py-5 bg-dark">
            <div className="container">
                <p className="m-0 text-center text-white">Copyright &copy; Richard Ecommerce React @2019</p>
            </div>
        </footer>


    


          

        </div>
      </Router>
    );
  }



  /*
   <Switch>
                <Route exact={true} path="/">
                  <HomePage />
                </Route>
                <Route path="/shopitem/:id">
                  <ShopItemPage />
                </Route>
                <Route exact={true} path="/shoppingcart/">
                  <ShoppingCardPage />
                </Route>
              </Switch> */