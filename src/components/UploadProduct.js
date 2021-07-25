import React, { useRef } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

export const UploadProduct = ({
  setProductForm,
  productForm,
  addImage,
  handleAttach,
  uploadedComplete,
  isEditing,
  updateProduct,
  addProduct,
  clearForm,
}) => {
  const fileInputRef = useRef(null);

  return (
    <Grid item xs={12} sm={6}>
      <Typography variant="body1">Agregar producto</Typography>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            onChange={(e) =>
              setProductForm({
                ...productForm,
                name: e.target.value,
              })
            }
            value={productForm.name || ""}
            onBlur={(e) =>
              setProductForm({
                ...productForm,
                name: e.target.value,
              })
            }
            id="name"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Price"
            value={productForm.price || ""}
            variant="outlined"
            onChange={(e) =>
              setProductForm({
                ...productForm,
                price: parseInt(e.target.value, 10),
              })
            }
            onBlur={(e) =>
              setProductForm({
                ...productForm,
                price: parseInt(e.target.value, 10),
              })
            }
            id="price"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            label="Description"
            variant="outlined"
            value={productForm.description || ""}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                description: e.target.value,
              })
            }
            onBlur={(e) =>
              setProductForm({
                ...productForm,
                description: e.target.value,
              })
            }
            id="description"
          />
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={productForm.isInStock}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    isInStock: e.target.checked,
                  })
                }
                color="primary"
              />
            }
            label="Hay stock!"
          />
        </Grid>
        <Grid item xs={9}>
          <input
            style={{ display: "none" }}
            id="image"
            type="file"
            onChange={addImage}
            ref={fileInputRef}
          />
          <TextField
            fullWidth
            label="Image"
            variant="outlined"
            id="imageHelper"
            onClick={handleAttach}
            value={productForm.image}
          />
          <Typography variant="subtitle2">
            {uploadedComplete
              ? "La imagen se subió correctamente ✔ "
              : "Todavía no se subió nada ❌"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            style={{ margin: "0px 10px" }}
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              clearForm();
            }}
          >
            Limpiar
          </Button>
          <Button
            variant="contained"
            style={{ margin: "0px 10px" }}
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              if (isEditing.editing) {
                updateProduct(isEditing.productId);
              } else {
                addProduct();
              }
            }}
          >
            {isEditing.editing ? "Actualzar" : "Agregar producto"}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
