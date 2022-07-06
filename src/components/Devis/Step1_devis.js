import React,{useState,useEffect} from 'react'
import axios from 'axios';
import ArticleItem from "./articleItem/ArticleItem";
import "./Step1_devis.css";
import Modal from "@mui/material/Modal";
import Modal1 from './Modal_Items_devis/Modal_1'
import ShoppingCart from "./shoppingCart/ShoppingCart"


function Step1_devis() {

  const [articles, setArticles] = useState([]);

  const [open, setOpen] = useState(false);

  const [nomArticle,setNomArticle]=useState('')

  const [idArticle,setIdArticle]=useState('')

  const [elementsDevis,setElementsDevis]=useState([{}])



  useEffect(
    (data) => {
      axios.get("http://localhost:4000/app/Liste_articles").then((res) => {
        const articles = res.data;
        setArticles(articles);
      });
    },
    [articles]
  );

  const handleOpen = (Nom,id) => {
    setNomArticle(Nom)
    setIdArticle(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteArticle = async (id, public_id) => {
    try {
      const destroyImg = axios.post("http://localhost:4000/app/destroy", {
        public_id,
      });
      const deleteArticle = axios.delete(
        `http://localhost:4000/app/deleteArticle/${id}`
      );

      await destroyImg;
      await deleteArticle;
      
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="Step1_devis">
      <ShoppingCart elementsDevis={elementsDevis}/>
      <div className="articles">
        {articles.map((article) => {
          return (
            <div key={article.Nom} className="articles-item">
              <ArticleItem  article={article} deleteArticle={deleteArticle} handleOpen={handleOpen} />
            </div>
          );
        })}
      </div>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Modal1 nomArticle={nomArticle} idArticle={idArticle} handleClose={handleClose} setElementsDevis={setElementsDevis} />
      </Modal>
    </div>
  )
}

export default Step1_devis