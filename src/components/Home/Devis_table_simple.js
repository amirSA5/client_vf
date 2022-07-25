import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TAX_RATE = 0.19;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

export default function SpanningTable({element}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={4}>
              Details
            </TableCell>
            <TableCell align="center" colSpan={2}
            >Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sous Article</TableCell>
            <TableCell align="right">Serie</TableCell>
            <TableCell align="right">taille</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {element.elementDevis && element.elementDevis.map((row) => (
            <TableRow>
              <TableCell>{row.sousArticleNom}</TableCell>
              <TableCell align="right">{row.serieValue}</TableCell>
              <TableCell align="right">{row.largeur}*{row.hauteur}</TableCell>
              <TableCell align="right">{row.quantite}</TableCell>
              <TableCell align="right">{ccyFormat(Number(element.montant/element.elementDevis.length)/row.quantite)}</TableCell>
              <TableCell align="right">{ccyFormat(Number(element.montant/element.elementDevis.length))}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(element.montant)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(Number(element.montant)*0.19)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(Number(element.montant)+Number(element.montant)*0.19)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
