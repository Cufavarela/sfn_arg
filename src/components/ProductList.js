import { Grid, Container, CircularProgress } from "@material-ui/core";
import Product from "./Product";

const ProductList = ({ products, isLoading }) => {
  return (
    <Container disableGutters>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} className="productList">
          {products.map((product) => (
            <Grid item xs={12} md={6} lg={4}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProductList;
