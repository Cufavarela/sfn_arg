import { Box, Container } from "@material-ui/core";
import ProductList from "../components/ProductList";

export const Home = () => {
  return (
    <Box className="bg">
      <Container>
        <ProductList />
      </Container>
    </Box>
  );
};
