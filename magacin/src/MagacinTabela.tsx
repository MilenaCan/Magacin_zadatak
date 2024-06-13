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
  onDelete: (index: number) => void;
}
const MagacinTabela: React.FC<MagacinTabelaProps> = ({
  products,
  onDelete,
}) => {
  return (
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
        </TableRow>
      ))}
    </TableBody>
  );
};

export default MagacinTabela;
