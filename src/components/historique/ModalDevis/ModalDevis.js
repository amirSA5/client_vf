import React from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import logo from '../../Home/image/logo.png'
import "../../Home/Devis.css"
import Devis_table_simple from "../../Home/Devis_table_simple"; 
import Pdf from 'react-to-pdf'



const ref = React.createRef();



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

function ModalDevis({element,handleClose}) {

    const date=  new Date();

  return (
    <Box sx={styleArticleDetails} >
    <div className="global" ref={ref} >
    <div className="desc">
        <div id="logo">
        <img  src={logo}  alt="logo"/>
        </div>
        <div className="entete">
        <div id="desc_soc">
            <div> Entreprise General Aluminuim </div>
            <div> Adresse:   route saltnia km 4 </div>
            <div> Tel : 74000000  </div>    
            <div> Email:exemple@gmail.com  </div>          
        </div>
        <div id="desc_devis">
            <h3>Devis N°:1</h3>
            <div> Date: {date.toLocaleDateString()} </div>
            <div> Nom Client:{element.Nom_Client} </div>  
            <div> Num Tel: {element.Num_tel}</div>      
        </div> 
        </div>
        <section id="devis">
            <Devis_table_simple element={element} />
        </section>
        
    </div>
    </div>

      <Pdf targetRef={ref} filename="code-example.pdf">
        
      {({ toPdf }) =><Button variant="outlined" color="error" onClick={toPdf} >PDF</Button>}
        
      </Pdf>
          <Button
                      size="large"
                      variant="contained"
                      color="success"
                      onClick={handleClose}
                    >
                      Fermer
                    </Button>
        </Box>
  )
}

export default ModalDevis