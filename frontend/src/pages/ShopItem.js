import React,{useState,useEffect} from 'react';
import {useParams,useHistory,Redirect} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'


import {productDetailAction} from '../actions/productActions';
import HomeLayout from '../layout/HomeLayout';





const ShopItem = function(props){
    const productDetail = useSelector(state => state.productDetail);
    const {product , loading , error} = productDetail;
    const dispatch = useDispatch();

    let history = useHistory();



    let { id } = useParams();

    const [itemCountSelected,setItemCountSelected]  = useState(1);

    const handleAddToCart = () => {
       history.push('/shoppingcart/' + id + '?qte=' + itemCountSelected)
    }


    useEffect(() =>{
        dispatch(productDetailAction(id))

        product === {} && history.push("/");
     },[]);

    return <HomeLayout>
        {loading? <div>Chargement...</div> : error ? <div className="text-center"> <h1>Produit Non Trouvé</h1>
            
            </div>:
    
    <div className="text-center" >
               <div className="card mt-4">
               <img style={{maxHeight: 250,maxWidth: 250}}  className="card-img-top img-fluid mx-auto "  src={product.imageUrl} alt="" />
               <div className="card-body">
                   <h3 className="card-title">{product.name}</h3>
                   <h4>{product.price} Fcfa</h4>
                   <p className="card-text">{product.description}</p>
                   <span className="text-warning">&#9733; &#9733; &#9733; &#9733; &#9734;</span>
                   4.0 stars
               </div>

               <div className="card" style={{width: 500}} >
               <img src="..." className="card-img-top" alt="..." />
               <div className="card-body">
                   <h5 className="card-title">Prix : {product.price} Fcfa</h5>
                   <p className="card-text">Statuts : {product.countInStock > 0 ? "Disponible" : "Indisponible"}.</p>
                   

                   <div className="row my-1 ">
                       <div className="col-md-3"><span className="card-text font-weight-bold">Quantité : </span></div>
                       <div className="col-md-9">
                           <select value={itemCountSelected} onChange={(e) => setItemCountSelected(e.target.value)} className="custom-select" id="inputGroupSelect01">
                           {/*   <option selected>Choisissez...</option>  */}

                           {[...Array(product.countInStock).keys()].map(value => <option value={value +1}>{value + 1}</option> )}
                           
                           
                           </select>
                       </div>
                   </div> 
                   

                   {product.countInStock > 0 && <button onClick={(e) => handleAddToCart()} className="btn btn-warning">Ajouter au panier</button> }
                   
               </div>
               </div>


               </div>
{/* 
               <div className="card card-outline-secondary my-4">
               <div className="card-header">
                   Product Reviews
               </div>
               <div className="card-body">
                   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                   <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                   <hr />
                   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                   <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                   <hr />
                   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                   <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                   <hr />
                   <Link className="btn btn-success" to="">Leave a Review</Link>

               </div>
               </div>
*/}

   </div>}
    </HomeLayout>
}

export default ShopItem;