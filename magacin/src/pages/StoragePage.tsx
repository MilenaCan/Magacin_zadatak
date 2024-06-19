import React, { useState, useEffect } from "react";
import DashboardPage from "../components/Dashboard";
import StoragePageTable from "../components/StoragePageTable";
import AddProduct from "../components/AddProduct";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Typography,
  Grid,
  Container,
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

export const StoragePage = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
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
    const confirmed = window.confirm(
      "Da li ste sigurni da želite da obrišete ovaj proizvod?"
    );
    if (confirmed) {
      const newProducts = [...products];
      newProducts.splice(index, 1);
      setProducts(newProducts);
      localStorage.setItem("products", JSON.stringify(newProducts));
    }
  };
  const handleProductsChange = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <DashboardPage>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Pretraži proizvode"
              variant="outlined"
              value={search}
              onChange={handleSearchChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TableContainer sx={{ boxShadow: "6" }} component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <Typography fontWeight={"fontWeightBold"}>
                        Naziv proizvoda
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography fontWeight={"fontWeightBold"}>
                        Količina
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography fontWeight={"fontWeightBold"}>
                        Cijena
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography fontWeight={"fontWeightBold"}>
                        Težina
                      </Typography>
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
                  </TableRow>
                </TableHead>

                <StoragePageTable
                  products={filteredProducts}
                  onDelete={handleDelete}
                  onProductsChange={handleProductsChange}
                />
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <AddProduct
          open={open}
          onClose={() => {
            handleClose();
            handleProductAdded();
          }}
        />
      </Container>
    </DashboardPage>
  );
};
