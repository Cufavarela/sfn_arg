import { useEffect, useState } from "react";
import { getFirestore } from "../components/firebase";
import { Box, Container, Paper } from "@material-ui/core";
import ProductList from "../components/ProductList";
import Filter from "../components/Filter";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const db = getFirestore();
  const productsCollection = db.collection("products");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getProducts = () => {
    productsCollection
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size === 0) {
          alert("No hay productos disponibles");
        }
        const unOrderedProducts = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setProducts(
          unOrderedProducts.sort((a) => (a.sale ? -1 : !a.sale ? 1 : 0))
        );
      })
      .catch((err) => alert(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const sortFunction = (sortBy) => {
    switch (sortBy) {
      case "Precio Menor a Mayor":
        const DESCList = [...products].sort((a, b) =>
          a.price > b.price ? 1 : a.price < b.price ? -1 : 0
        );
        return setProducts(DESCList);
      case "Precio Mayor a Menor":
        const ASCList = [...products].sort((a, b) =>
          a.price < b.price ? 1 : a.price > b.price ? -1 : 0
        );
        return setProducts(ASCList);
      case "Precio en Oferta":
        const SALEList = [...products].sort((a) =>
          a.sale ? -1 : !a.sale ? 1 : 0
        );
        return setProducts(SALEList);
      default:
        return;
    }
  };

  const searchByName = (input) => {
    let filteredArray = products.filter((product) =>
      product.name.toLowerCase().includes(input)
    );
    setFilteredProducts(filteredArray);
  };

  useEffect(() => {
    sortFunction(sortBy);
  }, [sortBy]);

  return (
    <Box className="bg">
      <Container disableGutters>
        <Paper elevation={3} className="filterBar">
          <Filter
            sortBy={sortBy}
            setSortBy={setSortBy}
            search={search}
            setSearch={setSearch}
            searchByName={searchByName}
          />
        </Paper>
        {search !== "" ? (
          <ProductList products={filteredProducts} isLoading={isLoading} />
        ) : (
          <ProductList products={products} isLoading={isLoading} />
        )}
      </Container>
    </Box>
  );
};
