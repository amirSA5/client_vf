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

function ModalAjoutVer({serieID,handleCloseVer}) {

    const [verReference, setVerReference] = useState({ reference: "" })

    const [verFormule, setverFormule] = useState({ formule: "" })

    const handleChangeInputVerReference = (e) => {
    const { name, value } = e.target;
    setVerReference({ ...verReference.reference, [name]: value });
  };

  const handleChangeInputVerFormule = (e) => {
    const { name, value } = e.target;
    setverFormule({ ...verFormule.formule, [name]: value });
  };

  const ajoutVer = (e) => {

    axios.post("http://localhost:4000/app/Ajout_ver", { reference: verReference.reference, formule: verFormule.formule, serie: serieID })
      .then((response) => console.log(response.data));
      handleCloseVer()
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
                    value={verReference.reference}
                    name="reference"
                    onChange={handleChangeInputVerReference}
                  />
                  <TextField
                    label="Filled success"
                    variant="filled"
                    color="success"
                    focused
                    value={verFormule.formule}
                    name="formule"
                    onChange={handleChangeInputVerFormule}
                  />
                </td>

              </tr>
              <tr className="tr_table_Modal">
                <td className="td_table_Modal">
                  <Button
                    onClick={() => ajoutVer()}
                    size="large"
                    variant="contained"
                    color="success"
                  >
                    Ajouter Profiler
                  </Button>
                </td>
                <td className="td_table_Modal" onClick={handleCloseVer}>
                  <h2 className="exit_modal">x</h2>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
  )
}

export default ModalAjoutVer