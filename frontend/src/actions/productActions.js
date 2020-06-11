import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
       PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL} from '../constants/productConstants'
import axios from 'axios';
const listProductsAction = () => async (dispatch) => {
    try {
        dispatch({type : PRODUCT_LIST_REQUEST});
        const {data} = await  axios.get('http://127.0.0.1:5000/api/products');
        dispatch({type: PRODUCT_LIST_SUCCESS ,payload:data});
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL ,payload:error.message });
        
    }
}

const productDetailAction = (id) => async (dispatch) => {
    try {
        dispatch({type : PRODUCT_DETAIL_REQUEST});
        const {data} = await  axios.get('http://127.0.0.1:5000/api/products/' +id);
        dispatch({type: PRODUCT_DETAIL_SUCCESS ,payload:data});
    } catch (error) {
        dispatch({type: PRODUCT_DETAIL_FAIL ,payload:error.message });
        
    }
}


export {listProductsAction,productDetailAction};