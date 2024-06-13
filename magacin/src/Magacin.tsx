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

  return (
    <DashboardPage>
      <Box>
        <TableContainer sx={{ width: "100%" }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">Nazi proizvoda</TableCell>
                <TableCell align="right">Kolicina</TableCell>
                <TableCell align="right">Cijena</TableCell>
                <TableCell align="right">Tezina</TableCell>
                <TableCell align="right">Serijski broj</TableCell>
                <TableCell align="right">
                  <Button onClick={handleOpen}>Dodaj Proizvod</Button>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <MagacinTabela products={products} />
          </Table>
        </TableContainer>
        <AddProduct
          open={open}
          onClose={() => {
            handleClose();
            handleProductAdded();
          }}
        />
      </Box>
    </DashboardPage>
  );
};
