import { TableRow, TableCell, TableBody, Button } from "@mui/material";

interface Product {
  productName: string;
  quantity: string;
  price: string;
  weight: string;
  serialNumber: string;
}

interface MagacinTabelaProps {
  products: Product[];
}
const MagacinTabela: React.FC<MagacinTabelaProps> = ({ products }) => {
  return (
    <TableBody>
      {products.map((product, index) => (
        <TableRow key={index}>
          <TableCell align="right">{product.productName}</TableCell>
          <TableCell align="right">{product.quantity}</TableCell>
          <TableCell align="right">{product.price}</TableCell>
          <TableCell align="right">{product.weight}</TableCell>
          <TableCell align="right">{product.serialNumber}</TableCell>
          <TableCell align="right">
            <Button>Izmjeni</Button>
          </TableCell>
          <TableCell align="right">
            <Button>Obrisi</Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default MagacinTabela;
