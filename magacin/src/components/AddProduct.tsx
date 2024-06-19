import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";

import { useState } from "react";
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

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
}
const AddProduct: React.FC<AddProductDialogProps> = ({ open, onClose }) => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
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
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(file);
        setImageUrl(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  const resetState = () => {
    setProductName("");
    setQuantity("");
    setPrice("");
    setColor("");
    setSerialNumber("");
    setDescription("");
    setImage(null);
    setImageUrl(null);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const product = {
      id: generateProductId(),
      productName,
      quantity,
      price,
      color,
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
    resetState();
    onClose();
  };
  const handleClose = () => {
    resetState();
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
            Dodavanje proizvoda
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
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
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
            required
            margin="dense"
            id="price"
            name="price"
            label="Cijena (KM)"
            type="number"
            fullWidth
            variant="standard"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="color"
            name="color"
            label="Boja"
            type="text"
            fullWidth
            variant="standard"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <TextField
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
            minRows={3}
            required
            style={{ width: "100%", resize: "none" }}
            id="description"
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
          <Button
            onClick={handleClose}
            variant="outlined"
            startIcon={<CancelIcon />}
            sx={{ boxShadow: "1" }}
          >
            Otkaži
          </Button>
          <Button
            sx={{ boxShadow: "1" }}
            type="submit"
            variant="outlined"
            startIcon={<AddIcon />}
          >
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default AddProduct;
