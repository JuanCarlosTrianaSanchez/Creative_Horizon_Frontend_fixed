
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
    category: {
      _id: string;
      type: string;
      __v: number;
    };
    __v: number;
    description?: string; 
    featured?: boolean; 
  }
  