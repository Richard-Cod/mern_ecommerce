import {CARD_ADD_ITEM,CARD_ADD_ITEM_FAIL,CARD_REMOVE_ITEM,CARD_NUMBER_ITEM} from '../constants/cardConstantes'

import axios from 'axios';
import Cookie from 'js-cookie';


const cardAddAction = (id,qte) => async (dispatch,getState) => {
    try {
        const {data} = await  axios.get('http://127.0.0.1:5000/api/products/' +id);
        dispatch({type: CARD_ADD_ITEM ,payload:{...data,qte}});
        const {cardReducer : {shoppingItems}} =  getState();
        Cookie.set("shoppingItems", JSON.stringify(shoppingItems));
        
    } catch (error) {
        dispatch({type: CARD_ADD_ITEM_FAIL ,payload:error.message });
    }

}

const cardRemoveAction = (_id) => async (dispatch,getState) => {
    const test = window.confirm("Retirer de votre panier ?");
    if(test){
        dispatch({type: CARD_REMOVE_ITEM ,payload:{_id}});

        const {cardReducer : {shoppingItems}} =  getState();
       Cookie.set("shoppingItems", JSON.stringify(shoppingItems));
       
    }
}


const cardNumberItemsAction = () => async (dispatch,getState) => {
        let result = 0;

        const shoppingItems = getState().cardReducer.shoppingItems

        if(shoppingItems){
            shoppingItems.map(value => result+= Number(value.qte) )

        }

        dispatch({type: CARD_NUMBER_ITEM ,payload:result});
}


export {cardAddAction,cardRemoveAction,cardNumberItemsAction};