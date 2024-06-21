export interface Product {
    _id: string;  
    name: string;
    brand: string;
    price: number;
    stock: number;
    imageUrl: string;
    size: string;
    colour: string;
    material: string;
    category: Category;
  }
  
  export interface Category {
    _id: string;  
    type: string;
  }
  