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
import { useState } from "react";
interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
}
const AddProduct: React.FC<AddProductDialogProps> = ({ open, onClose }) => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const product = {
      productName,
      quantity,
      price,
      weight,
      serialNumber,
      description,
    };
    console.log(product);
    const existingProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );
    existingProducts.push(product);
    localStorage.setItem("products", JSON.stringify(existingProducts));
    setProductName("");
    setQuantity("");
    setPrice("");
    setWeight("");
    setSerialNumber("");
    setDescription("");
    onClose();
  };
  const handleClose = () => {
    // Reset fields
    setProductName("");
    setQuantity("");
    setPrice("");
    setWeight("");
    setSerialNumber("");
    setDescription("");

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
        <DialogTitle>Dodavanje proizvoda</DialogTitle>
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
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
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
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
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
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Otkazi</Button>
          <Button type="submit">Dodaj</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default AddProduct;
