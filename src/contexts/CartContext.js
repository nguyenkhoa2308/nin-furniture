import { createContext, useState, useEffect, useContext } from 'react';
import httpRequest from '~/utils/httpRequest';
import { AuthContext } from '~/contexts/AuthContext';

export const CartContext = createContext({
    isAuthenticated: false,
    user: {
        email: '',
        name: '',
    },
});

export const CartProvider = ({ children }) => {
    const { auth } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState();
    const [countItems, setCountItems] = useState(0);

    const getCart = async () => {
        try {
            const res = await httpRequest.get('/cart/user');

            setCartItems(res?.cart);

            const items = res?.cart?.items;

            const countItem = items.reduce((prev, item) => {
                return prev + item.quantity;
            }, 0);

            setCountItems(countItem);
        } catch (error) {
            console.log('Không có cart');
        }
    };

    const addToCart = async (productId, quantity) => {
        try {
            const response = await httpRequest.post('cart/add', {
                productId,
                quantity,
            });

            if (response.EC === 0) {
                // toast.success('Thêm vào giỏ hàng thành công!', {
                //     position: "top-right",
                //     autoClose: 3000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: false,
                //     draggable: false,
                //     progress: undefined,
                //     theme: "light",
                // });
                getCart();
                console.log('Successful');
            } else {
                // toast.error('Thêm vào giỏ hàng thất bại!', {
                //     position: "top-right",
                //     autoClose: 3000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "light",
                // });
                console.log('Unsuccessful');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCartItem = async (cartItemId) => {
        try {
            const response = await httpRequest.delete(`cart/delete/${cartItemId}`);
            if (response.EC === 0) {
                getCart();
            } else {
                console.log('Error delete');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateQuantityOfCartItem = async (quantity, cartItemId) => {
        try {
            const response = await httpRequest.put(`cart/updateQuantity/`, {
                quantity: quantity,
                cartItemId: cartItemId,
            });
            if (response.EC === 0) {
                getCart();
            } else {
                console.log('Error update');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.user?.id) {
            getCart();
        } else {
            setCartItems([]); // Nếu chưa đăng nhập, giỏ hàng sẽ trống
            setCountItems(0);
        }
    }, [auth]);

    return (
        <CartContext.Provider
            value={{ cartItems, countItems, getCart, addToCart, deleteCartItem, updateQuantityOfCartItem }}
        >
            {children}
        </CartContext.Provider>
    );
};
