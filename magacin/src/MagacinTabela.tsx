import { TableRow, TableCell, TableBody, Button } from "@mui/material";
import ProductDescription from "./ProductDescription";
import ChangeProduct from "./ChangeProduct";
import { useEffect, useState } from "react";
interface Product {
  id: string;
  productName: string;
  quantity: string;
  price: string;
  weight: string;
  serialNumber: string;
  description: string;
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
      <TableBody>
        {products.map((product, index) => (
          <TableRow key={index}>
            <TableCell align="left">{product.productName}</TableCell>
            <TableCell align="left">{product.quantity}</TableCell>
            <TableCell align="left">{product.price}</TableCell>
            <TableCell align="left">{product.weight}</TableCell>
            <TableCell align="left">{product.serialNumber}</TableCell>
            <TableCell align="left">
              <Button onClick={() => handleOpenModal(product)}>Izmjeni</Button>
            </TableCell>
            <TableCell align="left">
              <Button onClick={() => onDelete(index)}>Obrisi</Button>
            </TableCell>
            <TableCell align="left">
              <Button onClick={() => handleOpenModalDetail(product)}>
                Detalji
              </Button>
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
