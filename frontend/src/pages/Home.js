import React , {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {
    Link
  } from "react-router-dom";
  import HomeLayout from '../layout/HomeLayout';

import {listProductsAction} from '../actions/productActions';

const Home = function(props){
    //const [products,setProducts] =  useState([]);
    const productList = useSelector(state => state.productList);
    
    const {products , loading , error} = productList;
    const dispatch = useDispatch();
    
    useEffect(() =>{

        dispatch(listProductsAction())
     
     },[]);


    return <HomeLayout><div className="sss">
    <div className="row">

{
loading ? <div>Chargement ...</div>:  error ? <div>Erreur {error}</div> :


products.map(function(value,index){
       return( <div key={value._id} className="col-lg-4 col-md-6 mb-4">
        <div className="card h-100">
            <Link to="/"> <img className="card-img-top" src={value.image} alt="" /> </Link>
            
            <div className="card-body">
            <h4 className="card-title">
                <Link to={`shopitem/${value._id}`}>{value.name}</Link>
            </h4>

            <h5>{value.price} fcfa</h5>
            <p className="card-text">{value.description}</p>
            </div>
            <div className="card-footer">
            <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
            </div>
        </div>
        </div>
)})
        
}
        

      
    </div>

  </div>
  </HomeLayout>

}

export default Home;