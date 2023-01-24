import { useState, useEffect } from 'react';
import { Text, Container, Grid } from '@nextui-org/react';
import { fetchProducts } from '../api/product';
import { ProductRequest, ProductResponse } from '../interfaces/product';
import ProductCard from './ProductCard';
import { AddProduct } from './AddProduct';

export default function AdminProduct() {
  const [products, setProducts] = useState<ProductResponse[]>([]);

  const addProduct = (newProduct: ProductResponse) => {
    setProducts([...products, newProduct]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchProducts();
      setProducts(response);
    };
    fetchData()
  }, []);

  return (
    <Container>
      <Text h1 css={{ textAlign: 'center' }}>
        Tickets and Passes
      </Text>
      <AddProduct addProduct={addProduct} />
      <Grid.Container
        gap={2}
        id="shopCards"
        css={{
          display: 'grid',
          gridTemplateColumns: '20% 20% 20%',
          gridTemplateRows: 'repeat(autofill, minmax(300px, 1fr))',
          gap: '40px',
          justifyContent: 'center',
        }}
      >
        {products.map(product => (
          <ProductCard
            name={product.name}
            price={product.price}
            description={product.description}
            isAdmin={true}
          />
        ))}
      </Grid.Container>
    </Container>
  );
}
