import React,{useEffect, useState} from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from 'axios';
import Radio from '@mui/material/Radio';
import Checkbox from "@mui/material/Checkbox";






const styleArticleDetails = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  height: "35vw",
  bgcolor: "background.paper",
  boxShadow:
    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
  borderRadius: "25px",
  p: 4,
  overflowY:'auto',
  overflowX:'hidden'
  
};

const ariaLabel = { "aria-label": "description" };

const label = { inputProps: { "aria-label": 'Checkbox demo' } };


function Modal_1({nomArticle,idArticle,handleClose,setElementsDevis}) {

  const [sousArticle, setSousArticle] = useState("");

  const [sousArticleNom, setSousArticleNom] = useState("");

  const [listeSousArticle, setListeSousArticle] = useState([]);

  const [serie, setSerie] = useState([]);

  const [serieValue, setSerieValue] = useState('');

  const [attribut, setAttribut] = useState([]);

  const [profiler, setProfiler] = useState([]);

  const [largeur, setLargeur] = useState('');

  const [hauteur, setHauteur] = useState('');

  const [quantite, setQantite] = useState('');

  const [profilerValue, setProfilerValue] = useState([{}]);



  useEffect(data=>{
    axios.get("http://localhost:4000/app/Liste_sousArticle").then((res) => {
        const SousArticles = res.data;
        var list =[{}]
        var j=0
        for(var i=0;i<SousArticles.length;i++){
            if(idArticle===SousArticles[i].article){
                list[j]=SousArticles[i]
                j++
            }
        }
        setListeSousArticle(list);
      });
  },[idArticle]);

  const handleChangesousArticle = (e) => {
    setSousArticle(e.target.value);

  };

  const getSousArticleSerie = (id,Nom) =>{
    setSousArticleNom(Nom)
    axios.get('http://localhost:4000/app/Liste_serie').then(res => {
        const serie = res.data
        var list = [{}]
        var j = 0
        for (var i = 0; i < serie.length; i++) {
          if (id === serie[i].sousArticle) {
            list[j] = serie[i]
            j++
          }
        }
        setSerie(list)
      })
  };

  const handleChange = (event) => {
    setSerieValue(event.target.value);
  };

  const getProfiler = (id)=>{
    try {
      axios.get("http://localhost:4000/app/Liste_Attribut").then((res) => {
        const attribut = res.data;
        var list =[{}]
        var j=0
        for(var i=0;i<attribut.length;i++){
            if(id===attribut[i].serie){
                list[j]=attribut[i]
                j++
            }
        }
        setAttribut(list);
        axios.get("http://localhost:4000/app/Liste_profiler").then((res)=>{
            const profiler = res.data
            var tab=[{}]
            var k =0
            for(var i=0;i<profiler.length;i++){
                for(var j=0;j<list.length;j++){
                    if(profiler[i].attribut===list[j]._id){
                        tab[k]=profiler[i]
                        k++
                    }

                }
            }
            setProfiler(tab)
        })
        });
      
    } catch (error) {}
  };

  const ajoutPanier = (sousArticleNom,largeur,hauteur,quantite,serieValue,profilerValue) =>{
    const valider = {
      sousArticleNom : sousArticleNom,
      largeur : largeur,
      hauteur:hauteur,
      quantite:quantite,
      serieValue:serieValue,
      profilerValue:profilerValue
    }
    setElementsDevis((elementsDevis)=>[...elementsDevis,valider])
    handleClose()

  }

  return (
    <Box sx={styleArticleDetails}>
          <div className="articleDetails">
            <h1 className="title_Modal">{nomArticle}</h1>
            <FormControl fullWidth className="FormControl">
              <InputLabel id="demo-simple-select-label">
                Selectioner un choix
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sousArticle}
                label="choix"
                onChange={handleChangesousArticle}
              >
                {listeSousArticle.map((data) => {
                  return (
                    <MenuItem key={data._id} name={data.Nom} value={data._id} onClick={()=>getSousArticleSerie(data._id,data.Nom)} >
                      {data.Nom}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <table className="table_Details_Modal">
              <tbody>
                <tr className="tr_table_Details_Modal">
                  <td className="td_table_Details_Modal">
                    <Input
                      placeholder="donner votre largeur"
                      required
                      type="number"
                      inputProps={ariaLabel}
                      onChange={(e)=>setLargeur(e.target.value)}
                    />
                  </td>
                  <td className="td_table_Details_Modal">
                    <Input
                      placeholder="donner votre hauteur"
                      required
                      type="number"
                      inputProps={ariaLabel}
                      onChange={(e)=>setHauteur(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="table_quantite">
              <tbody>
                <tr>
                  <td>
                    <TextField
                      fullWidth
                      id="outlined-number"
                      label="quntité"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e)=>setQantite(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td>Serie</td>
                  {
                    serie.map(data=>{
                      return( 
                        <td key={data._id}>{data.Nom}<Radio
                                                        checked={serieValue===data.Nom}
                                                        onChange={handleChange}
                                                        onClick={()=>getProfiler(data._id)}
                                                        value={data.Nom}
                                                        name="radio-buttons"
                                                        inputProps={{ 'aria-label': 'A' }}
                                                      />
                        </td>
                        )
                    })
                  }
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                {attribut.map((data) => {
                    return (
                      <tr key={data._id} >
                       <td className="td_table_next" key={data._id}>{data.Nom}</td>
                       {profiler.map((data)=>{
                        return(
                            <td className="td_table_next" key={data._id}>{data.reference}<Checkbox value={data.reference} name={data.formule} {...label} onChange={(e)=>setProfilerValue((profilerValue)=>[...profilerValue,{reference:e.target.value,formule:e.target.name}])} /></td>
                        )
                       })} 
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Button
                      size="large"
                      variant="contained"
                      color="success"
                      onClick={()=>ajoutPanier(sousArticleNom,largeur,hauteur,quantite,serieValue,profilerValue)}
                    >
                      Ajout
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={handleClose}
                      size="large"
                      variant="contained"
                      color="error"
                    >
                      Fermer
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Box>
  )
}

export default Modal_1
