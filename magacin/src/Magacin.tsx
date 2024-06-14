import React, { useState, useEffect } from "react";
import DashboardPage from "./Dashboard";
import MagacinTabela from "./MagacinTabela";
import AddProduct from "./AddProduct";
import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  Button,
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
      <TableContainer sx={{ width: "100%" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Naziv proizvoda</TableCell>
              <TableCell align="left">Kolicina</TableCell>
              <TableCell align="left">Cijena</TableCell>
              <TableCell align="left">Tezina</TableCell>
              <TableCell align="left">Serijski broj</TableCell>
              <TableCell align="left">
                <Button onClick={handleOpen}>Dodaj Proizvod</Button>
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
