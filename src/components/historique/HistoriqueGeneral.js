import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import axios from 'axios';
import ModalDevis from "./ModalDevis/ModalDevis";
import Modal from "@mui/material/Modal";




export default function HistoriqueGeneral() {

  const [devis, setDevis] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const [element, setElement] = React.useState([]);

  React.useEffect(
    (data) => {
      axios.get("http://localhost:4000/app/Liste_Devis").then((res) => {
        const devis = res.data;
        setDevis(devis);
      });
    },
    [devis]
  );

  const deleteDevis = async (id) => {
    try {

      const deleteDevis = axios.delete(
        `http://localhost:4000/app/delete_Devis/${id}`
      );


      await deleteDevis;

    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleOpen = (row) => {
    setElement(row)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead >
          <TableRow>
            
            <TableCell style={{ color: "#1976d2",fontWeight:"bold" }} align="center">
            Nom Client
            </TableCell>
            <TableCell style={{ color: "#1976d2",fontWeight:"bold" }} align="center">
            Prenom Client
            </TableCell>
            <TableCell style={{ color: "#1976d2",fontWeight:"bold" }} align="center">
            Numero Tel
            </TableCell>
            <TableCell style={{ color: "#1976d2",fontWeight:"bold" }} align="center">
            Montant
            </TableCell>
            <TableCell style={{ color: "#1976d2",fontWeight:"bold" }} align="center">
            Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            devis.map(row=>{
              return(
                <>
                <TableRow>
                  <TableCell  align="center">{row.Nom_Client}</TableCell>
                  <TableCell  align="center">{row.Prenom_Client}</TableCell>
                  <TableCell  align="center">{row.Num_tel}</TableCell>
                  <TableCell  align="center">{row.montant}</TableCell>
                  <TableCell  align="center"><Button variant="outlined" color="error" onClick={()=>deleteDevis(row._id)}>Supprimer</Button><Button variant="outlined" color="error" onClick={()=>handleOpen(row)}>PDF</Button></TableCell>
                </TableRow>
                
                </>
              )
            })
          }
        </TableBody>
      </Table>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <ModalDevis element={element}  handleClose={handleClose}  />
      </Modal>
    </TableContainer>
  );
}