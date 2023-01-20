import { Text, Container } from '@nextui-org/react';
import Articles from './Articles';

export default function AdminProduct() {
  return (
    <Container>
      <Text h1 css={{ textAlign: 'center' }}>
        Articles
      </Text>
      <Articles isAdmin={true} />
    </Container>
  );
}
