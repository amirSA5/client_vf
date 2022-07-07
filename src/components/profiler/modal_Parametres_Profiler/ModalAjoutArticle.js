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

function ModalAjoutArticle({handleClose}) {

    const [article, setArticle] = useState({ Nom: "" });

    const [images, setImages] = useState(false);

    const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

    const handleUpload = async (e) => {
    try {
      const file = e.target.files[0];
      console.log(file);
      if (!file) return alert("File not exist.");

      if (file.size > 1024 * 1024)
        // 1mb
        return alert("Size too large!");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return alert("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("http://localhost:4000/app/upload",formData);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

    const ajoutArticle = (e) => {
      
      axios.post("http://localhost:4000/app/Ajout_articles", {...article, images })
      .then((response) => console.log(response.data));
    handleClose();
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
                    value={article.Nom}
                    name="Nom"
                    onChange={handleChangeInput}
                  />
                </td>
                <td className="td_table_Modal">
                  <Button
                    onClick={ajoutArticle}
                    size="large"
                    variant="contained"
                    color="success"
                  >
                    Ajouter Article
                  </Button>
                </td>
              </tr>
              <tr className="tr_table_Modal">
                <td className="td_table_Modal">
                  {" "}
                  <input
                    type="file"
                    name="file"
                    id="file_up"
                    onChange={handleUpload}
                  />
                </td>
                <td className="td_table_Modal" onClick={handleClose}>
                  <h2 className="exit_modal">x</h2>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
  )
}

export default ModalAjoutArticle