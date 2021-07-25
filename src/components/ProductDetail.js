import {
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

export const ProductDetail = ({
  detailModalOpen,
  setDetailModalOpen,
  product,
}) => {
  return (
    <Dialog
      fullWidth
      open={detailModalOpen}
      onClose={() => setDetailModalOpen(false)}
    >
      <DialogContent className="modalContent">
        <img src={product.image} alt={product.name} className="modalImg" />
        <Typography variant="h5">{product.name}</Typography>
        <Typography align="left" variant="h6" component="h2">
          ${product.price}
          {!product.isInStock && (
            <span style={{ color: "red" }}> - Sin stock</span>
          )}
        </Typography>
        <Typography variant="subtitle2">{product.description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDetailModalOpen(false)} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
