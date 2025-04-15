import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../Eassets/assets";

export const StoreContext = createContext(null);

const StoreContextprovider = (props) => {

    const [cartItems, setCartItems] = useState({});

    //backend Url.
    const url = "https://tomato-l8nf.onrender.com";
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([]);


    // Add To Cart.
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
        }
    }


    //Remove From Cart.
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
        }
    }

    const GetTotalCartAmount = () => {
        let total_amount = 0;
        for (const Item in cartItems) {
            if (cartItems[Item] > 0) {
                let itemInfo = food_list.find((product) => product._id === Item);
                if(itemInfo){
                    total_amount += itemInfo.price * cartItems[Item];
                }
            }
        }
        return total_amount;
    }

    const fetchFoodList = async() => {
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        GetTotalCartAmount,
        url,
        token,
        setToken
    }


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextprovider;