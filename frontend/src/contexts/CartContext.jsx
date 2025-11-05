import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = function({ children }) {
    const [items, setItems] = useState(() => {
        try {
            const raw = localStorage.getItem('cart');
            return raw ? JSON.parse(raw) : [];
        } catch { return []; }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product, qty = 1) => {
        setItems(prev => {
            const found = prev.find(i => i.product.id === product.id);
            if (found) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + qty } : i);
            return [...prev, { product, qty }];
        });
    };

    const clearCart = () => {
        setItems([]);
    };

    const removeFromCart = (productId) => {
        setItems(prev => prev.filter(i => i.product.id !== productId));
    };

    const updateQty = (productId, qty) => {
        setItems(prev => prev.map(i => i.product.id === productId ? { ...i, qty } : i));
    };

    const total = items.reduce((s, it) => s + it.product.precio * it.qty, 0);

    return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, total, clearCart }}>
        {children}
    </CartContext.Provider>
    );
};

export { CartProvider };
export default CartContext;
