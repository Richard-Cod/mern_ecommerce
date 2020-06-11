import React from 'react';

import axios from 'axios';

import UserForm from './ProductForm';




export default function ProductAdd(props){

    const Add_url = "http://localhost:5000/api/products/";


    
    async function addUser(obj){

      const {name,price,image,brand,category,countInStock,description,rating,numReviews} = obj ;

      await axios.post(Add_url, {name,price,image,brand,category,countInStock,description,rating,numReviews})
        .then(function (response) {
          console.log(response.data);
        })

    }

    async function soumission(e,obj){
        e.preventDefault();
        console.log(obj);
        await addUser(obj);

        if(props.maj){
            alert("Utilisateur ajouté");
            props.maj();
        }

        //window.location = '/users';
    }


    return (
        <div className="container" style={{"border":"solid","boxShadow":"2px 2px 5px blue"}}>
            <p>AJOUT D'UTILISATEUR</p>
            
            <UserForm onSubmit={soumission} formsData={{name:"",price:0,image:"http://placehold.it/500x150",brand:"",category:"",countInStock:20,description:"",rating:"",numReviews:0}}  />
        </div>
    )

}