import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import axios from 'axios'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShoppingCart({ elementsDevis }) {
  const [open, setOpen] = React.useState(false);

  const [nomClient,setNomClient]=React.useState("")

  const [prenomClient,setPrenomClient]=React.useState("")

  const [numTel,setNumTel]=React.useState("")

  const [typeAl,setTypeAl]=React.useState("")

  const [montantAl,setMontantAl]=React.useState(0)

  const [montantVer,setMontantVer]=React.useState(0)

  const [montantMainOeuvre,setMontantMainOeuvre]=React.useState(0)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeInputNomClient = (e) => {
    setNomClient(e.target.value);
  };
  const handleChangeInputPrenomClient = (e) => {
    setPrenomClient(e.target.value);
  };
  const handleChangeInputNumTel = (e) => {
    setNumTel(e.target.value);
  };
  const handleChangeInputTypeAl = (e) => {
    setTypeAl(e.target.value);
  };
  const handleChangeInputMontantAl = (e) => {
    setMontantAl(e.target.value);
  };
  const handleChangeInputMontantVer = (e) => {
    setMontantVer(e.target.value);
  };
  const handleChangeInputMontantMainOeuvre = (e) => {
    setMontantMainOeuvre(e.target.value);
  };

  var montantTotal=Number(montantAl)+Number(montantVer)+Number(montantMainOeuvre)

  const ajoutDevis = () =>{
    axios.post("http://localhost:4000/app/Ajout_Devis", { Nom_Client:nomClient,Prenom_Client:prenomClient,Num_tel:numTel,typeElement:typeAl,elementDevis:elementsDevis,montant:montantTotal })
      .then((response) => console.log(response.data));
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Devis Final
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Devis Final
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <table>
          <tbody>
            <tr>
              <td>Nom Client :</td>
              <td><TextField  variant="standard" color="warning" focused value={nomClient}  onChange={handleChangeInputNomClient} /></td>
              <td>Prénom Client :</td>
              <td><TextField  variant="standard" color="warning" focused value={prenomClient}  onChange={handleChangeInputPrenomClient}/></td>
              <td>Num Téléphone :</td>
              <td><TextField  variant="standard" color="warning" focused value={numTel}  onChange={handleChangeInputNumTel}/></td>
              <td>Type Alamuinuim :</td>
              <td><TextField  variant="standard" color="warning" focused value={typeAl}  onChange={handleChangeInputTypeAl}/></td>
            </tr>
          </tbody>
        </table>
        <List>
          {elementsDevis.map((item) => {
            return (
              <>
                <ListItem button>
                  <table>
                    <tbody>
                      <tr>
                        <td>{item.sousArticleNom}</td>
                        <td>{item.largeur}*{item.hauteur}</td>
                        <td>{item.quantite}</td>
                        <td>{item.serieValue}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                </ListItem>
                
                <Divider />
              </>

            );
          })}
        </List>
        <table>
          <tbody>
            <tr>
              <td><Button variant="outlined" color="error">mise en bar</Button></td>
              <td><Button variant="outlined" color="error">ver</Button></td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td>montant Alamuinuim</td>
              <td><TextField  variant="standard" color="warning" focused  value={montantAl}  onChange={handleChangeInputMontantAl} /></td>
              <td>montant ver</td>
              <td><TextField  variant="standard" color="warning" focused  value={montantVer}  onChange={handleChangeInputMontantVer} /></td>
              <td>montant main d'oeuvre</td>
              <td><TextField  variant="standard" color="warning" focused  value={montantMainOeuvre}  onChange={handleChangeInputMontantMainOeuvre} /></td>
            </tr>
            <tr>
              <td>montant Total</td>
              <td>{montantTotal}Dt</td>
            </tr>
          </tbody>
        </table>
        <Button variant="outlined" color="success" onClick={ajoutDevis}>Devis</Button>
      </Dialog>
    </div>
  );
}