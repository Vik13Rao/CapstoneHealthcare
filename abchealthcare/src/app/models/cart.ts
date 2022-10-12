

    export interface CartItem {
        medicineId: number;
        name: string;
        price: number;
        pictureUrl: string;
        brand: string;
        category: string;
        quantity: number;
    }

    export interface Cart {
        id: number;
        buyerId: string;
        items: CartItem[];
    }



