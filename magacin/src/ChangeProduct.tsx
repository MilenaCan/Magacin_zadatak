import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
interface Product {
  id: string;
  productName: string;
  quantity: string;
  price: string;
  weight: string;
  serialNumber: string;
  description: string;
  imageUrl?: string;
}
interface ChangeProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onProductChange: () => void;
}

const ChangeProduct: React.FC<ChangeProductDialogProps> = ({
  open,
  onClose,
  product,
  onProductChange,
}) => {
  const [newProductName, setNewProductName] = useState(
    product?.productName || ""
  );
  const [newQuantity, setNewQuantity] = useState(product?.quantity || "");
  const [newPrice, setNewPrice] = useState(product?.price || "");
  const [newWeight, setNewWeight] = useState(product?.weight || "");
  const [newSerialNumber, setNewSerialNumber] = useState(
    product?.serialNumber || ""
  );
  const [newDescription, setNewDescription] = useState(
    product?.description || ""
  );

  useEffect(() => {
    if (product) {
      setNewProductName(product.productName);
      setNewQuantity(product.quantity);
      setNewPrice(product.price);
      setNewWeight(product.weight);
      setNewSerialNumber(product.serialNumber);
      setNewDescription(product.description);
    }
  }, [product]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (product) {
      const updatedProduct = {
        ...product,
        productName: newProductName,
        quantity: newQuantity,
        price: newPrice,
        weight: newWeight,
        serialNumber: newSerialNumber,
        description: newDescription,
      };

      const existingProducts = JSON.parse(
        localStorage.getItem("products") || "[]"
      );

      const updatedProducts = existingProducts.map((p: Product) =>
        p.id === product.id ? updatedProduct : p
      );

      localStorage.setItem("products", JSON.stringify(updatedProducts));

      onProductChange();
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>
          <Typography fontWeight={"fontWeightBold"}>
            Izmjena proizvoda
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="productName"
            name="productName"
            label="Naziv proizvoda"
            type="text"
            fullWidth
            variant="standard"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="quantity"
            name="quantity"
            label="Kolicina"
            type="number"
            fullWidth
            variant="standard"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label="Cijena"
            type="number"
            fullWidth
            variant="standard"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="weight"
            name="weight"
            label="Tezina"
            type="number"
            fullWidth
            variant="standard"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="serialNumber"
            name="serialNumber"
            label="Serijski broj"
            type="text"
            fullWidth
            variant="standard"
            value={newSerialNumber}
            onChange={(e) => setNewSerialNumber(e.target.value)}
          />
          <Typography pt={1} pb={1}>
            Opis
          </Typography>
          <TextareaAutosize
            autoFocus
            required
            style={{ width: "100%", resize: "none" }}
            id="descriptioj"
            name="description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            startIcon={<CancelIcon />}
            sx={{ boxShadow: "1" }}
          >
            Otkaži
          </Button>
          <Button
            type="submit"
            variant="outlined"
            startIcon={<CheckIcon />}
            sx={{ boxShadow: "1" }}
          >
            Sačuvaj
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChangeProduct;
