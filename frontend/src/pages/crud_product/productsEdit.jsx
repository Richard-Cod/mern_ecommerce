import React , {useState,useEffect} from 'react';

import axios from 'axios';

import ProductForm from './ProductForm';




export default function UsersEdit(props){

    const [product, setProduct] = useState(null);
    const url = "http://127.0.0.1:5000/api/products/";

    async function getProduct(){
        alert(url+props.id)

        await axios.get(url+props.id)
        .then(function (response) {
            setProduct(response.data)
            console.log("Dans le useefecce")
        console.log(response.data);
        })


    }

    
    useEffect(() => {
         getProduct()
        //setUser();
      },[]);
    

     //getUser();


    
    async function editProduct(obj){
      const  {name,price,image,brand,category,countInStock,description,rating,numReviews} = obj

      console.log(url+"edit/"+product._id)

      await axios.put(url+"edit/"+product._id, {name,price,image,brand,category,countInStock,description,rating,numReviews})
        .then(function (response) {
          console.log(response.data);
        })

    }

    async function soumission(e,obj){
        e.preventDefault();
        console.log(obj);
        await editProduct(obj);

        if(props.maj){
            alert("Utilisateur modifié avec succès");
            props.maj();
        }

        //window.location = '/users';
    }


    return (
        <div className="container" style={{"border":"solid","boxShadow":"2px 2px 5px blue"}}>
            <p>Modification D'UTILISATEUR</p>
            <button onClick={()=> console.log(product)}></button>

            {product && <ProductForm onSubmit={soumission} formsData={product}  />}
            
            
        </div>
    )

}