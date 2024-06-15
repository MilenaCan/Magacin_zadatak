import React, { useState, useEffect } from "react";
import DashboardPage from "./Dashboard";
import MagacinTabela from "./MagacinTabela";
import AddProduct from "./AddProduct";
import AddIcon from "@mui/icons-material/Add";

import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Typography,
} from "@mui/material";

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
export const Magacin = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
  }, []);

  const handleProductAdded = () => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (index: number) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
  };
  const handleProductsChange = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
  };
  return (
    <DashboardPage>
      <TableContainer sx={{ boxShadow: "6", width: "100%" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Typography fontWeight={"fontWeightBold"}>
                  Naziv proizvoda
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography fontWeight={"fontWeightBold"}>Količina</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography fontWeight={"fontWeightBold"}>Cijena</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography fontWeight={"fontWeightBold"}> Težina</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography fontWeight={"fontWeightBold"}>
                  Serijski broj
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Button
                  onClick={handleOpen}
                  variant="outlined"
                  startIcon={<AddIcon />}
                  sx={{ boxShadow: "1" }}
                >
                  Dodaj Proizvod
                </Button>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <MagacinTabela
            products={products}
            onDelete={handleDelete}
            onProductsChange={handleProductsChange}
          />
        </Table>
      </TableContainer>
      <AddProduct
        open={open}
        onClose={() => {
          handleClose();
          handleProductAdded();
        }}
      />
    </DashboardPage>
  );
};
