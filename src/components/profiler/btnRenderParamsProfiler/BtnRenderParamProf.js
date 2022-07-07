import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
////////////////
import TextField from "@mui/material/TextField";
import axios from "axios";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';

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

function BtnRenderParamsProfiler({ data, deleteSousArticle }) {
  const [open, setOpen] = useState(false);


  const [sousArticleUpdate, setSousArticleUpdate] = useState({ Nom: "" });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setSousArticleUpdate({ ...sousArticleUpdate, [name]: value });
  };

  const updateSousArticle = (e) => {
    axios
      .put(`http://localhost:4000/app/update_sousArticle/${data._id}`, {
        ...sousArticleUpdate,
      })
      .then((response) => console.log(response.data));
    setOpen(false);
  };

  return (
    <div className="row_btn">
      {
        <>
          {" "}
          <ButtonGroup disableElevation variant="contained">
            {" "}
            <Link
              id="btn_buy"
              to="#!"
              onClick={() =>
                deleteSousArticle(data._id)
              }
            >
              <Button variant="contained" color="error">
                {" "}
                <DeleteIcon /> Supprimer
              </Button>
            </Link>
            <Link id="btn_view" to="#!" onClick={handleOpen}>
              <Button variant="contained" color="primary">
                {" "}
                <AutoFixHighIcon /> Modifier
              </Button>
            </Link>
            </ButtonGroup>
        </>
      }
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
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
                    value={sousArticleUpdate.Nom}
                    name="Nom"
                    onChange={handleChangeInput}
                  />
                </td>
                <td className="td_table_Modal">
                  <Button
                    onClick={updateSousArticle}
                    size="large"
                    variant="contained"
                    color="success"
                  >
                    Modifier Article
                  </Button>
                </td>
              </tr>
              <tr className="tr_table_Modal">
                <td className="td_table_Modal" onClick={handleClose}>
                  <h2 className="exit_modal">x</h2>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Modal>
    </div>
  );
}

export default BtnRenderParamsProfiler;