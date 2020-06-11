import {CARD_ADD_ITEM , CARD_ADD_ITEM_FAIL,CARD_ADD_ITEM_REQUEST,CARD_REMOVE_ITEM,CARD_NUMBER_ITEM} from '../constants/cardConstantes';



function cardReducer(state = {shoppingItems : [] },action){
    switch (action.type){
        case CARD_ADD_ITEM_REQUEST:
            return {loading: true};

        case CARD_ADD_ITEM:
            const test = action.payload.qte > 0 && action.payload.countInStock >= action.payload.qte
            const product = state.shoppingItems.find(val => val._id === action.payload._id);

            if(product){
                console.log("Produit existe");
                const newShoppingItems = state.shoppingItems.map(val => val._id === action.payload._id ? action.payload : val);
                return test ?  {loading: false,shoppingItems : newShoppingItems } : state;
            }

            console.log("Produit Non existant");
            return {loading:false,shoppingItems : [...state.shoppingItems,action.payload]};

        case CARD_ADD_ITEM_FAIL:
            return {loading:false,error:action.payload};
        case CARD_REMOVE_ITEM:

            return {shoppingItems : state.shoppingItems.filter(val => val._id !== action.payload._id),id:action.payload._id}
        case CARD_NUMBER_ITEM :
            console.log("On veut le nombre  ",action.payload)
            return {numberOfItems : action.payload}
        default:
            return state;
    }
}

export {cardReducer};