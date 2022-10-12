export interface Medicine {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    category?: string;
    brand: string;
    quantityStock?: number;
    seller?: string;
}