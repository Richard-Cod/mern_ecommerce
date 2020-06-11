import React from  'react';
import Modal from 'react-modal';



const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };


Modal.setAppElement('#root')

export default function Show (props){

 

    return (
        <div>
            <Modal
            isOpen={props.modalIsOpen}
            onAfterOpen={props.afterOpenModal}
            onRequestClose={props.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            >
            <h2>{props.title}</h2>
            <button className="btn btn-danger ml-1" onClick={props.closeModal}>Fermer</button>

            {props.children}
            </Modal>
        </div>
    )
}