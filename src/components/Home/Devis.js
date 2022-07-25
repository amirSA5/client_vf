import React from "react";
import "./Devis.css"
import DevisTable from "./DevisTable";
import logo from './image/logo.png' 
import axios from 'axios';


export default function Devis(){

    const [devis, setDevis] = React.useState([]);

    React.useEffect(
    (data) => {
      axios.get("http://localhost:4000/app/Liste_Devis").then((res) => {
        const devis = res.data;
        setDevis(...devis[devis.length-1]);
      });
    },
    [devis]
  );
    
    const date=  new Date();
   
    return(
       
    <>
    <div className="global">
    <div className="desc">
        <div id="logo">
        <img  src={logo}  alt="logo"/>
        </div>
        <div className="entete">
        <div id="desc_soc">
            <div> Entreprise General Aluminuim </div>
            <div> Adresse:   route saltnia km 7 </div>
            <div> Tel : 74000000  </div>    
            <div> Email:exemple@gmail.com  </div>          
        </div>
        <div id="desc_devis">
            <h3>Devis N°:</h3>
            <div> Date: {date.toLocaleDateString()} </div>
            <div> Nom Client:{devis.Nom_Client}  </div>  
            <div> Num Tel:{devis.Num_tel} </div>      
        </div> 
        </div>
        <section id="devis">
            <DevisTable devis={devis} />
        </section>
        
    </div>
    </div>
      
      </>




    )





}