import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export const AdminProductList = ({
  isLoading,
  products,
  removeProduct,
  editProduct,
}) => {
  return (
    <Grid item xs={12} md={6}>
      <Typography variant="body1">Productos disponibles</Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box
          style={{
            maxHeight: "70vh",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {products.map((product) => (
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h6">{product.name}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6">${product.price}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6">
                  {product.isInStock ? "Stock ✔" : "Stock ❌"}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={() => removeProduct(product.id)} size="mdall">
                  <DeleteIcon />
                </Button>
                <Button onClick={() => editProduct(product)} size="small">
                  <EditIcon />
                </Button>
              </Grid>
            </Grid>
          ))}
        </Box>
      )}
    </Grid>
  );
};
