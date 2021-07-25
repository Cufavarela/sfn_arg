import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { getFirestore, storage } from "../components/firebase";
import { LoginForm } from "../components/loginForm";

const AdminView = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [uploadedComplete, setUploadedCOmplete] = useState(false);
  const db = getFirestore();
  const productsCollection = db.collection("products");
  const [isEditing, setIsEditing] = useState({ editing: false, productId: "" });
  const [productForm, setProductForm] = useState({
    image: "",
    name: "",
    description: "",
    price: 0,
    isInStock: true,
  });

  const handleAttach = () => {
    fileInputRef.current.click();
  };

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

  const addProduct = () => {
    productsCollection.add(productForm).then(() => {
      getProducts();
      setUploadedCOmplete(false);
      setProductForm({
        image: "",
        name: "",
        description: "",
        price: 0,
        isInStock: true,
      });
    });
  };

  const removeProduct = (id) => {
    productsCollection
      .doc(id)
      .delete()
      .then(() => {
        getProducts();
      });
  };

  const addImage = (event) => {
    event.preventDefault();
    if (event.target.files[0]) {
      const image = event.target.files[0];
      uploadImage(image);
    }
  };

  const uploadImage = async (image) => {
    await storage
      .ref()
      .child("products/" + image.name)
      .put(image);
    storage
      .ref()
      .child("products/" + image.name)
      .put(image)
      .snapshot.ref.getDownloadURL()
      .then((res) => {
        setUploadedCOmplete(true);
        setProductForm({
          ...productForm,
          image: res,
        });
      });
  };

  const editProduct = (product) => {
    setProductForm({
      image: product.image,
      name: product.name,
      description: product.description,
      price: product.price,
      isInStock: product.isInStock,
    });
    setIsEditing({ editing: true, productId: product.id });
  };

  const updateProduct = (productId) => {
    productsCollection
      .doc(productId)
      .update({ ...productForm })
      .then(() => {
        getProducts();
        setUploadedCOmplete(false);
        setProductForm({
          image: "",
          name: "",
          description: "",
          price: 0,
          isInStock: true,
        });
      });
    setIsEditing({
      editing: false,
      productId: "",
    });
  };

  useEffect(() => {
    if (isLogged) {
      getProducts();
    }
  }, [isLogged]);

  return (
    <Container>
      {isLogged ? (
        <>
          <Typography variant="h5">Editar la lista de productos</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">Productos disponibles</Typography>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Box>
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
                        <Button
                          onClick={() => removeProduct(product.id)}
                          size="mdall"
                        >
                          <DeleteIcon />
                        </Button>
                        <Button
                          onClick={() => editProduct(product)}
                          size="small"
                        >
                          <EditIcon />
                        </Button>
                      </Grid>
                    </Grid>
                  ))}
                </Box>
              )}
            </Grid>
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
          </Grid>
        </>
      ) : (
        <LoginForm setIsLogged={setIsLogged} />
      )}
    </Container>
  );
};

export default AdminView;
