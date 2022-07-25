import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import Modal from "@mui/material/Modal";
import './ParametresProfiler.css'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ModalAjoutArticle from './modal_Parametres_Profiler/ModalAjoutArticle';
import BtnRenderParamsProfiler from './btnRenderParamsProfiler/BtnRenderParamProf';
import ModalAjoutSousArticle from './modal_Parametres_Profiler/ModalAjoutSousArticle';
import ModalAjoutSerie from './modal_Parametres_Profiler/ModalAjoutSerie';
import BtnRenderSerie from './btnRenderParamsProfiler/BtnRenderSerie';
import ModalAjoutAttribut from './modal_Parametres_Profiler/ModalAjoutAttribut';
import ModalAjoutProfiler from './modal_Parametres_Profiler/ModalAjoutProfiler';
import ModalAjoutVer from './modal_Parametres_Profiler/ModalAjoutVer';
function ParametresProfiler() {

    const [article, setArticle] = useState([])

    const [open, setOpen] = useState(false);

    const [openSousArticle, setOpenSousArticle] = useState(false);

    const [openSerie, setOpenSerie] = useState(false);

    const [openAttribut, setOpenAttribut] = useState(false);

    const [nomArticle, setNomArticle] = useState("")

    const [sousArticle, setSousArticle] = useState([])

    const [nomSousArticle, setNomSousArticle] = useState("")

    const [sousArticleItem, setSousArticleItem] = useState([])

    const [serieItem, setSerieItem] = useState([])

    const [articleID, setArticleID] = useState("")

    const [sousArticleID, setSousArticleID] = useState("")

    const [serie, setSerie] = useState([])

    const [attribut, setAttribut] = useState([])

    const [profiler, setProfiler] = useState([])

    const [nomSerie, setNomSerie] = useState("")

    const [serieID, setSerieID] = useState("")

    const [attributItem, setAttributItem] = useState([])

    const [profilerItem, setProfilerItem] = useState([])

    const [openProfiler, setOpenProfiler] = useState(false);

    const [openVer, setOpenVer] = useState(false);


    const [attributID, setAttributID] = useState("")

    const [ver, setVer] = useState([])

    const [verItem, setVerItem] = useState([])


    useEffect(() => {
      axios.get('http://localhost:4000/app/Liste_articles').then(res => {
        const articles = res.data
        setArticle(articles)
      })
      axios.get('http://localhost:4000/app/Liste_sousArticle').then(res => {
        const sousArticle = res.data
        setSousArticle(sousArticle)
      })
      axios.get('http://localhost:4000/app/Liste_serie').then(res => {
        const serie = res.data
        setSerie(serie)
      })
      axios.get('http://localhost:4000/app/Liste_Attribut').then(res => {
        const attribut = res.data
        setAttribut(attribut)
      })
      axios.get("http://localhost:4000/app/Liste_profiler").then((res) => {
          const profiler = res.data
          setProfiler(profiler)
        })
      axios.get("http://localhost:4000/app/Liste_ver").then((res) => {
          const ver = res.data
          setVer(ver)
        })
      
  },[article,nomArticle,nomSousArticle,nomSerie])

    const handleOpen = () => {
    setOpen(true);
  };

    const handleClose = () => {
    setOpen(false);
  };

  const afficherSousArticle = (Nom, id) => {
    try {
      setNomArticle(Nom)
      setArticleID(id)
      var list = [{}]
      var j = 0
      for (var i = 0; i < sousArticle.length; i++) {
        if (id === sousArticle[i].article) {
          list[j] = sousArticle[i]
          j++
        }
       }
      setSousArticleItem(list)
    } catch (error) {
      alert(error.response.data.msg)
    }

  }

  const deleteSousArticle = async (id) => {
    try {

      const deleteSousArticle = axios.delete(
        `http://localhost:4000/app/delete_sousArticle/${id}`
      );


      await deleteSousArticle;

    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleOpenSousArticle = () => {
    setOpenSousArticle(true);
  };

    const handleCloseSousArticle = () => {
    setOpenSousArticle(false);
  };

  const afficherSerie = (Nom, id) => {
    try {

      setNomSousArticle(Nom)
      setSousArticleID(id)
        var list = [{}]
        var j = 0
        for (var i = 0; i < serie.length; i++) {
          if (id === serie[i].sousArticle) {
            list[j] = serie[i]
            j++
          }
        }
        setSerieItem(list)
      
    } catch (error) {

    }

  }

  const handleOpenSerie = () => {
    setOpenSerie(true);
  };

  const handleCloseSerie = () => {
    setOpenSerie(false);
  };

  const deleteSerie = async (id) => {
    try {

      const deleteSousArticle = axios.delete(
        `http://localhost:4000/app/delete_serie/${id}`
      );


      await deleteSousArticle;

    } catch (err) {
      alert(err.response.data.msg);
    }
  };

   const afficherProfiler = (Nom, id) => {
    try {

      setNomSerie(Nom)
      setSerieID(id)
      
        var list = []
        var j = 0
        for (var i = 0; i < attribut.length; i++) {
          if (id === attribut[i].serie) {
            list[j] = attribut[i]
            j++
          }
        }
        setAttributItem(list)
        
          var tab = []
          var k = 0
          for (var n = 0; n < profiler.length; n++) {
            for (var m = 0; m < list.length; m++) {
              if (profiler[n].attribut === list[m]._id) {
                tab[k] = profiler[n]
                k++
              }

            }
          }
          setProfilerItem(tab)

          var listver = []
          var s = 0
            for (var r = 0; r < ver.length; r++) {
            if (id === ver[r].serie) {
              listver[s] = ver[r]
              s++
              console.log(listver)
            }
          }
          
          setVerItem(listver)
          



    } catch (error) {

    }

  }

  const handleOpenVer = () => {
    setOpenVer(true);
  };

  const handleCloseVer = () => {
    setOpenVer(false);
  };

  const handleOpenAttribut = () => {
    setOpenAttribut(true);
  };

  const handleCloseAttribut = () => {
    setOpenAttribut(false);
  };

    const deleteAttribut = async (id) => {
    try {

      const deleteAttribut = axios.delete(
        `http://localhost:4000/app/delete_Attribut/${id}`
      );


      await deleteAttribut;

    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const deleteVer = async (id) => {
    try {

      const deletever = axios.delete(
        `http://localhost:4000/app/delete_ver/${id}`
      );


      await deletever;

    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const handleCloseProfiler = () => {
    setOpenProfiler(false);
  };

  const handleOpenProfiler = (id) => {
    setAttributID(id)
    setOpenProfiler(true);
  };

  return (
    <div  className='parametres'>
      <h1 className='title_parametres'>Paramétres Profiler</h1>
      <Fab
        color="primary"
        aria-label="add"
        variant="extended"
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <table className='parametres_Table'>
        <tbody>
          <tr className='tr_parametres_Table'>
            {article.map(data => {
              return (<td key={data._id}><Button  className='paramétres_profiler' onClick={() => afficherSousArticle(data.Nom, data._id)} size='large' variant="contained" color="secondary">{data.Nom}</Button></td>)
            })}
          </tr>
        </tbody>
      </table>
      <h2 className='title_parametres' >{nomArticle}<AddCircleOutlinedIcon fontSize='large' color='error' onClick={handleOpenSousArticle} /> </h2>
      <table className='parametres_Table'>
        <tbody>
          <tr className='tr_parametres_Table'>
            {sousArticleItem.map(data => {
              return (

                <td key={data._id}>
                  <Button onClick={() => afficherSerie(data.Nom, data._id)} className='paramétres_profiler' size='large' variant="contained" color="success">{data.Nom}</Button>
                  <BtnRenderParamsProfiler data={data} deleteSousArticle={deleteSousArticle} />
                </td>
              )
            })}
          </tr>
        </tbody>
      </table>
      <h2 className='title_parametres' >{nomSousArticle}<AddCircleOutlinedIcon  onClick={handleOpenSerie}  fontSize='large' color='error' /></h2>
      <table className='parametres_Table'>
          <tbody>
            <tr className='tr_parametres_Table'>
            {serieItem.map(data => {
              return (

                <td key={data._id}>
                  <Button onClick={() => afficherProfiler(data.Nom, data._id)}  className='paramétres_profiler' size='large' variant="contained" color="success">{data.Nom}</Button>
                  <BtnRenderSerie data={data} deleteSerie={deleteSerie} />
                </td>
              )
            })}
          </tr>
          </tbody>
        </table>
        <h2 className='title_parametres'>{nomSerie}<AddCircleOutlinedIcon onClick={handleOpenAttribut}  fontSize='large' color='error' /></h2>
            <table>
          <tbody>
            {attributItem.map((data) => {
                          return (
                            <tr key={data._id} >
                              <td>
                                <Button onClick={() => deleteAttribut(data._id)}  className='paramétres_profiler' size='small' variant="contained" color="error"><DeleteIcon /></Button>
                                <Button onClick={() => handleOpenProfiler(data._id)}  className='paramétres_profiler' size='large' variant="contained" color="secondary"><AddCircleOutlinedIcon fontSize='meduim' /></Button>
                              </td>
                              <td className="td_table_next" key={data._id}>
                                {data.Nom}
                              </td>

                              {profilerItem.map((item) => {
                                if(data._id===item.attribut)
                                return (
                                  <td key={item._id} className="td_table_next">{item.reference}</td>
                                )
                              })}
                            </tr>
                          );
                        })}
          </tbody>
        </table>
        <Button onClick={handleOpenVer} >ajout ver</Button>
          <table>
          
          <tbody>
            {verItem.map((data) => {
                          return (
                            <tr key={data._id} >
                              <td>
                                <Button onClick={() => deleteVer(data._id)}  className='paramétres_profiler' size='small' variant="contained" color="error"><DeleteIcon /></Button>
                              </td>
                              <td className="td_table_next" key={data._id}>
                                {data.reference}
                              </td>
                            </tr>
                          );
                        })}

          </tbody>
        </table>              
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
      <ModalAjoutArticle handleClose={handleClose} />
      </Modal>
      <Modal
        hideBackdrop
        open={openSousArticle}
        onClose={handleCloseSousArticle}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
      <ModalAjoutSousArticle  articleID={articleID} handleCloseSousArticle={handleCloseSousArticle} />
      </Modal>
      <Modal
        hideBackdrop
        open={openSerie}
        onClose={handleCloseSerie}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
      <ModalAjoutSerie  sousArticleID={sousArticleID} handleCloseSerie={handleCloseSerie} />
      </Modal>
      <Modal
        hideBackdrop
        open={openAttribut}
        onClose={handleCloseAttribut}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
      <ModalAjoutAttribut  serieID={serieID} handleCloseAttribut={handleCloseAttribut} />
      </Modal>
      <Modal
        hideBackdrop
        open={openProfiler}
        onClose={handleCloseProfiler}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
      <ModalAjoutProfiler  attributID={attributID} handleCloseProfiler={handleCloseProfiler} />
      </Modal>
      <Modal
        hideBackdrop
        open={openVer}
        onClose={handleCloseVer}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
      <ModalAjoutVer  serieID={serieID} handleCloseVer={handleCloseVer} />
      </Modal>
    </div>
  )
}

export default ParametresProfiler