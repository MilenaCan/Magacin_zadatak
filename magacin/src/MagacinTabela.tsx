import { TableRow, TableCell, TableBody, Button } from "@mui/material";
import ProductDescription from "./ProductDescription";
import { useState } from "react";
interface Product {
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
}
const MagacinTabela: React.FC<MagacinTabelaProps> = ({
  products,
  onDelete,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
              <Button>Izmjeni</Button>
            </TableCell>
            <TableCell align="left">
              <Button onClick={() => onDelete(index)}>Obrisi</Button>
            </TableCell>
            <TableCell align="left">
              <Button onClick={() => handleOpenModal(product)}>Detalji</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <ProductDescription
        open={openModal}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </>
  );
};

export default MagacinTabela;
