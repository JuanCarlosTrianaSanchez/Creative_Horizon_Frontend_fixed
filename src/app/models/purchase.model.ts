import { Product } from './product.model'; // Asegúrate de importar el modelo de producto

export interface Purchase {
  userId: string;
  products: {
    product: Product;
    quantity: number;
    priceAtPurchase: number;
  }[];
  total: number;
  paymentMethod: 'tarjeta_de_credito' | 'tarjeta_debito' | 'neki' | 'daviplata';
  status: 'pendiente' | 'completa' | 'cancelado';
  date: Date;
}
