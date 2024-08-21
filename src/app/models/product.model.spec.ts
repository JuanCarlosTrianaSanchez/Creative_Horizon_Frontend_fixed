import { Product } from './product.model';

describe('Product Model', () => {
  it('should create an instance of Product with correct values', () => {
    const product: Product = {
      _id: '1',
      name: 'Test Product',
      brand: 'Test Brand',
      price: 100,
      stock: 10,
      imageUrl: 'http://example.com/image.jpg',
      size: 'Medium',
      colour: 'Red',
      material: 'Cotton',
      category: {
        _id: '1',
        type: 'Test Category',
        __v: 0,
      },
      __v: 0,
    };

    expect(product).toBeTruthy();
    expect(product.name).toEqual('Test Product');
    expect(product.price).toBe(100);
  });
});
