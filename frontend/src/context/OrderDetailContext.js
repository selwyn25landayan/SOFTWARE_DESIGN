import { createContext, useReducer} from "react";

export const OrderDetailContext = createContext()

export const orderdetailsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ORDERDETAILS':
            return {
                orderdetails: action.payload
            }

        case 'CREATE_ORDERDETAILS':
            return {
                orderdetails: [action.payload, ...state.orderdetails]
            }

        default:
            return state
    }
}
export const OrderDetailContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(orderdetailsReducer, { 
        orderdetails: null 
    })


    return (
        <OrderDetailContext.Provider value={{...state, dispatch}}>
            { children }
        </OrderDetailContext.Provider>
    )
}