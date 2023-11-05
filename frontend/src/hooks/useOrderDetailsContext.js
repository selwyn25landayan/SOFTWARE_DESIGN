import { OrderDetailContext } from "../context/OrderDetailContext";
import { useContext } from "react";

export const useOrderDetailsContext = () => {
    const context = useContext(OrderDetailContext)

    if (!context) {
        throw Error('useOrderDetailContext must be used inside an OrderDetailsContextProvider')
    }

    return context

}