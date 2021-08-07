import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
  Paper,
} from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import { useState } from "react";
import { ProductDetail } from "./ProductDetail";

const Product = ({ product }) => {
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  return (
    <>
      <Paper elevation={3} className="productCard">
        <img src={product.image} alt={product.name} className="productImg" />
        <Box className="infoContainer">
          <Typography align="left" gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography
            align="left"
            className={product.sale && "inSale"}
            variant="h5"
            component="h2"
          >
            ${product.price}{" "}
            {product.sale && <span className="inSale">- Oferta</span>}
          </Typography>
          {!product.isInStock && (
            <Typography align="left" variant="subtitle2" color="error">
              Sin stock
            </Typography>
          )}
        </Box>
        <Box className="productActions">
          <Button
            size="small"
            color="primary"
            onClick={() => setDetailModalOpen(true)}
          >
            Detalles
          </Button>
          <Typography color="primary" variant="h6">
            |
          </Typography>
          <Button
            size="small"
            color="primary"
            href={`https://api.whatsapp.com/send?phone=541166145318&text=%C2%A1Hola!%20Quiero%20mas%20info%20sobre%20${product.name}%20por%20favor`}
            target="blank"
          >
            Contacto
          </Button>
        </Box>
      </Paper>
      {detailModalOpen && (
        <ProductDetail
          detailModalOpen={detailModalOpen}
          setDetailModalOpen={setDetailModalOpen}
          product={product}
        />
      )}
    </>
  );
};

export default Product;
