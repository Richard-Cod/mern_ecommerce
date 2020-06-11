import React,{useEffect} from 'react';
import './shoppingCardCss.css'
import {Link,useParams,useLocation,useHistory,Redirect} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

import queryString from 'query-string';

import {cardAddAction,cardRemoveAction} from '../actions/cardActions'

const ShoppingCard = (props) => {
    const cardReducer = useSelector(state => state.cardReducer);
    let history = useHistory();


    const {shoppingItems} = cardReducer;

    const updateShoppingCard = (item,value) => {
        const test = value > 0 && item.countInStock >= value

        test && dispatch(cardAddAction(item._id,value));
        
    }

    const dispatch = useDispatch();
    //let history = useHistory();
    let { productId } = useParams();
    let location = useLocation();




    const getTotal = () => {
        let total = 0;
        shoppingItems.map(item => total+= item.qte * item.price );
        return total;
    }

    const increaseQuantity = (e,item) => {
        const qte = e.target.value;
        alert(qte);
        item.qte += qte;
    }
/*
    const removeItem = (item) => {
        items = items.filter(val => val._id !== item.id);
    }
*/


    useEffect(()=>{
        
        let params = queryString.parse(location.search);

        if(productId && params.qte){

            
            alert(productId+" --- "+ params.qte)

            dispatch(cardAddAction(productId,params.qte))
            history.push("/shoppingcart")

            //alert("ici")


        }
   


    },[])

    const removeItemHandler = (id) => {

        dispatch(cardRemoveAction(id))
        
    }

    


    const goToCheckout = () => shoppingItems.length > 0 && history.push("/connexion?redirect=paiement ");
    

    return  <div className="container">
    <div className="card shopping-cart">
             <div className="card-header bg-dark text-light">
                 <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                 Shipping cart
                 <Link to="/" className="btn btn-outline-info btn-sm pull-right">Continuez vos achats</Link>
                 <div className="clearfix"></div>
             </div>
             <div className="card-body">


        {shoppingItems.map(item => <div key={item._id}>
            <div className="row">
                         <div className="col-12 col-sm-12 col-md-2 text-center">
                                 <img className="img-responsive" src={item.image} alt="prewiew" width="120" height="80" />
                         </div>
                         <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                             <h4 className="product-name"><strong>{item.name}</strong></h4>
                             <h4>
                                 <small>{item.description}</small>
                             </h4>
                         </div>
                         <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                             <div className="col-3 col-sm-3 col-md-6 text-md-right" style={{paddingTop: 5}}>
                                 <h6><strong>{item.price} Fcfa <span className="text-muted">x</span></strong></h6>
                             </div>
                             <div className="col-4 col-sm-4 col-md-4">
                                 <div className="quantity">
                                     <input type="button" value="+" className="plus" />
                                     <input type="number" onChange={(e) => { updateShoppingCard(item,e.target.value) }} step="1" max={item.countInStock} min="1" value={item.qte} title="Qty" className="qty"
                                            size="4" />
                                     <input type="button" value="-" className="minus" />
                                 </div>
                             </div>
                             <div onClick={() => removeItemHandler(item._id)} className="col-2 col-sm-2 col-md-2 text-right">
                                 <button type="button" className="btn btn-outline-danger btn-xs">
                                     <i className="fa fa-trash" aria-hidden="true"></i>
                                 </button>
                             </div>
                         </div>
                     </div>
                     <hr />
        </div>
                     )}


                     {shoppingItems.length === 0 && <div>
                         <h1 className="text-center">VOTRE PANIER EST VIDE</h1>
                         </div> }
                     
                     
                 <div className="pull-right">
                     <button  className="btn btn-outline-secondary pull-right">Mettre à Jour</button>
                     
                 </div>
             </div>
             <div className="card-footer">
                 <div className="coupon col-md-5 col-sm-5 no-padding-left pull-left">
                     <div className="row">
                         <div className="col-6">
                             <input type="text" className="form-control" placeholder="cupone code" />
                         </div>
                         <div className="col-6">
                             <input type="submit" className="btn btn-default" value="Use cupone" />
                         </div>
                     </div>
                 </div>
                 <div className="pull-right" style={{margin: 10}}>
                     <button disabled={shoppingItems.length === 0} onClick={goToCheckout} className="btn btn-success pull-right">Passer à la caisse</button>

                     <div className="pull-right" style={{margin: 5}}>
                         Total price: <b>{getTotal()} Fcfa</b>
                     </div>

                 </div>
             </div>
         </div>
 </div>
}





export default ShoppingCard;