import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Cart } from "../models/cart";

interface StoreContextVal {
    cart: Cart | null;
    setCart: (cart: Cart) => void;
    removeItem: (medicineId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextVal | undefined>(undefined);

export function useStoreContext() {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw Error('Oops -  not inside the provider');
    }

    return context;
}

export function StoreProvider({ children }: PropsWithChildren<any>) {
    const [cart, setCart] = useState<Cart | null>(null);

    function removeItem(medicineId: number, quantity: number) {
        if (!cart) return;
        const items = [...cart.items];
        const itemIndex = items.findIndex(a => a.medicineId === medicineId);
        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quantity;
            if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
            setCart(prevState => {
                return { ...prevState!, items }
            })
        }
    }
    return (
        <StoreContext.Provider value={{ cart, setCart, removeItem }}>
            {children}
        </StoreContext.Provider>
    )
}