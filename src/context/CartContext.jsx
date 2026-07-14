import React, { useState, useContext, createContext } from "react";

export const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser utilizado dentro de un CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (producto, cantidad) => {
        const itemCart = cart.find(item => item.id === producto.id);
        if (itemCart) {
            const actualizarCart = cart.map(item => item.id === producto.id
                ? { ...item, cantidad: item.cantidad + cantidad }
                : item
            );
            setCart(actualizarCart);
        } else {
            setCart(previoCart => [...previoCart, { ...producto, cantidad }]);
        }
    };

    // Obtener la cantidad de un item específico
    const getCantidadActual = (productoID) => {
        const item = cart.find(item => item.id === productoID);
        return item ? item.cantidad : 0;
    };

    // Vaciar carrito
    const vaciarCart = () => {
        setCart([]);
    };

    // Eliminar un producto del carrito
    const eliminarItem = (productoID) => {
        const updatedCart = cart.filter(item => item.id !== productoID);
        setCart(updatedCart);
    }

    // Verificar si un producto ya esta en el carrito
    const estaEnCarrito = (productoID) => {
        return cart.some(item => item.id === productoID);
    }

    // Obtener la cantidad de productos en el carrito 
    // (sirve para poner el número de cantidad en el icono de carrito)
    const getCartCantidad = () => {
        return cart.reduce((acc, item) => acc + item.cantidad, 0);
    };

    // Obtener el precio total de los productos del carrito
    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    };

    return (
        <CartContext.Provider value={{
            cart, addToCart, getCantidadActual, vaciarCart,
            getCartCantidad, getCartTotal, eliminarItem, estaEnCarrito
            }}>
            {children}
        </CartContext.Provider>
    );
};

