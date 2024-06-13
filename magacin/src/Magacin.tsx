import React, { useState, useEffect } from "react";
import DashboardPage from "./Dashboard";
import MagacinTabela from "./MagacinTabela";
import AddProduct from "./AddProduct";
import {
  Box,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";

interface Product {
  productName: string;
  quantity: string;
  price: string;
  weight: string;
  serialNumber: string;
}
export const Magacin = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
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
  return (
    <DashboardPage>
      <TableContainer sx={{ width: "100%" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Nazi proizvoda</TableCell>
              <TableCell align="left">Kolicina</TableCell>
              <TableCell align="left">Cijena</TableCell>
              <TableCell align="left">Tezina</TableCell>
              <TableCell align="left">Serijski broj</TableCell>
              <TableCell align="left">
                <Button onClick={handleOpen}>Dodaj Proizvod</Button>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <MagacinTabela products={products} onDelete={handleDelete} />
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
