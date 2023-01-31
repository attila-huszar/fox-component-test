import { Grid, Button, Card, Row, Text, Spacer } from '@nextui-org/react';
import { fetchDeleteProduct } from '../api/products';
import { fetchCreateNewPendingOrder , fetchPendingOrder} from '../api/orders';
import { ProductRequest } from '../interfaces/product';
import { CartContextInterface } from '../interfaces/orders';
import { CartContext } from './App';
import { useContext } from 'react';

interface PropTypes extends ProductRequest {
  removeProduct?: (productId: number) => void;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  isAdmin,
  removeProduct,
}: PropTypes) {
  
  const {cart, setCart} = useContext<CartContextInterface>(CartContext)
  const deleteProductHandler = async () => {
    await fetchDeleteProduct(id!);
    removeProduct!(id!);
  }

  const createNewOrderHadler = async () =>{
    
    await fetchCreateNewPendingOrder (new Date(), id!, 1);
    const pendingOrders = await fetchPendingOrder();
    setCart(pendingOrders)
  }
  
  return (
    <Grid
      sm={12}
      md={5}
      id="cardGrid"
      css={{
        justifyContent: 'center',
        marginLeft: '32%',
        width: '100%',
        padding: '0',
      }}
    >
      <Card
        css={{
          w: '280px',
          display: 'flex',
          margin: '0 auto',
          backgroundColor: 'var(--nextui-colors-cardBackground)',
        }}
        id="card"
        isHoverable
      >
        <Card.Header
          css={{ backgroundColor: 'var(--nextui-colors-cardHeaderBackground)' }}
        >
          <Text css={{ color: 'White', margin: 'auto', fontSize: 'larger' }}>
            {name}
          </Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ py: '$10' }}>
          <Text css={{ margin: 'auto' }}>{price} Ft</Text>
          <Text css={{ margin: 'auto' }}>{description}</Text>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <Row justify="center">
            {isAdmin ? (
              <>
                <Button
                  onPress={deleteProductHandler}
                  shadow
                  size="md"
                  auto
                  color="gradient"
                  id="submit"
                >
                  Remove
                </Button>
                <Spacer />
                <Button shadow size="md" auto color="gradient" id="submit">
                  Edit
                </Button>
              </>
            ) : (
              <Button shadow size="md" auto color="gradient" id="submit" onPress={createNewOrderHadler}>
                Add to Cart
              </Button>
            )}
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
}
