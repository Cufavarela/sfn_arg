import { Grid, Container, CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import Product from "./Product";
import { getFirestore } from "../components/firebase";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const db = getFirestore();
  const productsCollection = db.collection("products");
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = () => {
    productsCollection
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size === 0) {
          alert("No hay productos disponibles");
        }
        setProducts(
          querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          })
        );
      })
      .catch((err) => alert(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
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
