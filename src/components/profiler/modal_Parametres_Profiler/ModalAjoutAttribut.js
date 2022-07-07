import React,{useState} from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from 'axios'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  height: "15vw",
  bgcolor: "background.paper",
  boxShadow:
    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
  borderRadius: "25px",
  p: 4,
};
function ModalAjoutAttribut({serieID,handleCloseAttribut}) {

    const [attribut, setAttribut] = useState({ Nom: "" });

    const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setAttribut({ ...attribut, [name]: value });
  };

  const ajoutAttribut = (e) => {

    axios.post("http://localhost:4000/app/Ajout_Attribut", { Nom: attribut.Nom, serie: serieID })
      .then((response) => console.log(response.data));
    handleCloseAttribut()
    e.preventDefault()
  };
  return (
    <Box sx={style}>
          <table className="table_Modal">
            <tbody>
              <tr className="tr_table_Modal">
                <td className="td_table_Modal">
                  <TextField
                    label="Filled success"
                    variant="filled"
                    color="success"
                    focused
                    value={attribut.Nom}
                    name="Nom"
                    onChange={handleChangeInput}
                  />
                </td>
                <td className="td_table_Modal">
                  <Button
                    onClick={ajoutAttribut}
                    size="large"
                    variant="contained"
                    color="success"
                  >
                    Ajouter Attribut
                  </Button>
                </td>
              </tr>
              <tr className="tr_table_Modal">
                <td className="td_table_Modal" onClick={handleCloseAttribut}>
                  <h2 className="exit_modal">x</h2>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
  )
}

export default ModalAjoutAttribut