import {
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  Paper,
  Container,
} from "@mui/material";
import ProductDescription from "./ProductDescription";
import ChangeProduct from "./ChangeProduct";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

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

interface MagacinTabelaProps {
  products: Product[];
  onDelete: (index: number) => void;
  onProductsChange: (products: Product[]) => void;
}
const MagacinTabela: React.FC<MagacinTabelaProps> = ({
  products,
  onDelete,
  onProductsChange,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductDetail, setSelectedProductDetail] =
    useState<Product | null>(null);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };
  const handleOpenModalDetail = (product: Product) => {
    setSelectedProductDetail(product);
    setOpenModalDetail(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCloseModalDetail = () => {
    setOpenModalDetail(false);
  };

  const handeProductChange = () => {
    const updatedProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );
    onProductsChange(updatedProducts);
  };

  return (
    <>
      <TableBody component={Paper}>
        {products.map((product, index) => (
          <TableRow key={index}>
            <TableCell align="left">{product.productName}</TableCell>
            <TableCell align="left">{product.quantity}</TableCell>
            <TableCell align="left">{product.price}</TableCell>
            <TableCell align="left">{product.weight}</TableCell>
            <TableCell align="left">{product.serialNumber}</TableCell>
            <TableCell align="left">
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  onClick={() => handleOpenModal(product)}
                  variant="outlined"
                  startIcon={<EditIcon />}
                  sx={{ boxShadow: "1" }}
                >
                  Izmjeni
                </Button>
                <Button
                  onClick={() => onDelete(index)}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  sx={{ boxShadow: "1" }}
                >
                  Obriši
                </Button>
                <Button
                  onClick={() => handleOpenModalDetail(product)}
                  variant="outlined"
                  startIcon={<ReadMoreIcon />}
                  sx={{ boxShadow: "1" }}
                >
                  Detalji
                </Button>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <ProductDescription
        open={openModalDetail}
        onClose={handleCloseModalDetail}
        product={selectedProductDetail}
      />
      <ChangeProduct
        open={openModal}
        onClose={() => {
          handleCloseModal();
          handeProductChange();
        }}
        product={selectedProduct}
        onProductChange={handeProductChange}
      />
    </>
  );
};

export default MagacinTabela;
