import React , {useState,useEffect} from  'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import Show from './Show';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import UsersAdd from './productsAdd';
import UsersEdit from './productsEdit';


const GetAll_url = "http://localhost:5000/api/products/";

export default function Users(){
  const [modalIsOpen,setIsOpen] = React.useState(false);


  function openModal() {
  setIsOpen(true);
}

function afterOpenModal() {
  // references are now sync'd and can be accessed.
  //subtitle.style.color = '#f00';
}

function closeModal(){
  setIsOpen(false);
}

  

    const [data, setUsersData] = useState([]);
    const [methode, setMethode] = useState("add");
    const [userEditId, setUserEditId] = useState(0);


    function deleteUser(id){
      confirmAlert({
        title: 'Suppression',
        message: 'Êtes vous sûr de vouloir supprimer ?',
        buttons: [
          {
            label: 'Oui',
            onClick: () => {
              axios.delete(GetAll_url+id)
                   .then(response => { console.log(response.data)});
                  setUsersData((prevValue) => prevValue.filter(el => el._id !== id))
            }
          },
          {
            label: 'Non',
            onClick: () => alert('Click No')
          }
        ]
      });


      //const test = confirm("êtes vous sûr de vouloir supprimer ?");

          


      
    }

  async function getUsers() {
      try {
        closeModal();

        const response = await axios.get(GetAll_url);
        console.log("la data e")
        console.log(response.data);
        setUsersData(response.data)

        return response.data;
      } catch (error) {
        console.error(error);
      }
    }

    function editUser(e,id){
      setMethode("edit");
      setUserEditId(id);

      openModal()

    }

   

    // Similaire à componentDidMount et componentDidUpdate : 
    useEffect(() => {
        getUsers()
        console.log(data)
      }, []);



    return (
        <div>
        <Show
          title = {methode === "add" ? "Ajouter un utilisateur" : "Modifier un utilisateur"}
          modalIsOpen = {modalIsOpen}
          afterOpenModal = {afterOpenModal}
          closeModal = {closeModal}
          
        >

        {methode === "add" ? <UsersAdd maj={getUsers}/> : <UsersEdit id={userEditId} maj={getUsers}/>}

           
        </Show>

            <p>Listes d'utilisateurs</p>

            <button onClick={(e)=>{
              setMethode("add");
              openModal();
              }} className="btn btn-primary">
              Ajouter un utilisateur
            </button>

            <Table striped bordered hover>
            <thead>
                <tr>
                <th>Nom</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            { data &&
                data.map((user)=> {
                    return (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td> <button onClick={(e) => {
                                    deleteUser(user._id)
                                  }} className="btn btn-danger">Supprimer</button>
                                   <Button onClick={(e)=> editUser(e,user._id)} 
                                           className="btn btn-warning">
                                           Modifer
                                    </Button>
                                 </td>
                            </tr>
                    )

                })


            }
            </tbody>
            
            </Table>

            {data.length === 0 &&  <h2 className="text-center">RIEN POUR LE MOMENT </h2> }



        </div>
    )
}