import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import React from "react";
interface Product {
  productName: string;
  quantity: string;
  price: string;
  weight: string;
  serialNumber: string;
  description: string;
}
interface ProductDescriptionProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}
const ProductDescription: React.FC<ProductDescriptionProps> = ({
  open,
  onClose,
  product,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Opis proizvoda</DialogTitle>
      <DialogContent>
        <p>{product?.description}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Zatvori</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDescription;
