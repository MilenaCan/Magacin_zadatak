import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
interface Product {
  productName: string;
  quantity: string;
  price: string;
  weight: string;
  serialNumber: string;
  description: string;
  imageUrl?: string;
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
        {product && (
          <Box>
            {product.imageUrl && (
              <Box mb={2} textAlign="center">
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Box>
            )}
          </Box>
        )}
        <Typography>{product?.description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Zatvori</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDescription;
