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
import { AdminProductList } from "../components/AdminProductList";
import { UploadProduct } from "../components/UploadProduct";

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

  const clearForm = () => {
    setProductForm({
      image: "",
      name: "",
      description: "",
      price: 0,
      isInStock: true,
    });
    setIsEditing({ editing: false, productId: "" });
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
            <AdminProductList
              isLoading={isLoading}
              products={products}
              removeProduct={removeProduct}
              editProduct={editProduct}
            />
            <UploadProduct
              setProductForm={setProductForm}
              productForm={productForm}
              addImage={addImage}
              handleAttach={handleAttach}
              uploadedComplete={uploadedComplete}
              isEditing={isEditing}
              updateProduct={updateProduct}
              addProduct={addProduct}
              clearForm={clearForm}
            />
          </Grid>
        </>
      ) : (
        <LoginForm setIsLogged={setIsLogged} />
      )}
    </Container>
  );
};

export default AdminView;
