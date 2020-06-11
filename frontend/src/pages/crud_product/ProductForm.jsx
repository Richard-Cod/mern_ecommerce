
import React , {useState} from 'react';

import { Form ,Button } from 'react-bootstrap';



export default function MyForm(props){
    const [formsData, setFormsData] = useState(props.formsData);

    function majInput(e){
        const name = e.target.name;
        const value = e.target.value;
        
        setFormsData(prevValue => {
            return {...prevValue,[name]:value}
        })
    }


    return (
        
            <Form onSubmit={(e)=> {
                props.onSubmit(e,formsData)
                setFormsData({name:"",description:"",price:"",image:""})
                 
            }}>


            <Form.Group controlId="formBasicEmail">
                <Form.Label>Nom</Form.Label>
                <Form.Control value={formsData.name} name="name" onChange={majInput} type="text" placeholder="Entrer le nom" />
            </Form.Group>


            <Form.Group controlId="formBasicEmail">
                <Form.Label>Description</Form.Label>
                <Form.Control value={formsData.description} name="description" onChange={majInput} type="text" placeholder="Entrer le prenom" />
            </Form.Group>


            <Form.Group controlId="formBasicEmail">
                <Form.Label>Prix</Form.Label>
                <Form.Control value={formsData.price} name="price" onChange={majInput} type="text" placeholder="Entrer le tel" />
            </Form.Group>

        
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Image</Form.Label>
                <Form.Control value={formsData.image} name="image" onChange={majInput} type="text" placeholder="Entrer le lien de l'image" />
            </Form.Group>


            
            <Button variant="primary" type="submit">
                Soumettre
            </Button>


            </Form>
    )
}