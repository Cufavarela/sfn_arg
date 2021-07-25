import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@material-ui/core";
import { useState } from "react";
import { ProductDetail } from "./ProductDetail";

const Product = ({ product }) => {
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  return (
    <>
      <Card raised className="productCard">
        <CardMedia
          image={product.image}
          title={product.name}
          className="productImg"
        />
        <CardContent>
          <Typography align="left" gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography align="left" variant="h5" component="h2">
            ${product.price}
          </Typography>
          {!product.isInStock && (
            <Typography align="left" variant="subtitle2" color="error">
              Sin stock
            </Typography>
          )}
        </CardContent>
        <CardActions className="productActions">
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
        </CardActions>
      </Card>
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
