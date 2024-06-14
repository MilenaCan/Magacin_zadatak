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
  Input,
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
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const generateProductId = () => {
    return `product_${Date.now()}`;
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const product = {
      id: generateProductId(),
      productName,
      quantity,
      price,
      weight,
      serialNumber,
      description,
      imageUrl,
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
    setImage(null);
    setImageUrl(null);
    onClose();
  };
  const handleClose = () => {
    setProductName("");
    setQuantity("");
    setPrice("");
    setWeight("");
    setSerialNumber("");
    setDescription("");
    setImage(null);
    setImageUrl(null);
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
          <Typography pt={1} pb={1}>
            Slika
          </Typography>
          <TextField
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={handleImageChange}
            fullWidth
          />
          {imageUrl && (
            <Box mt={2}>
              <img src={imageUrl} alt="Product" style={{ width: "100%" }} />
            </Box>
          )}
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
