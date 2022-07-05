import React from "react";
import "./ArticleItem.css";
import BtnRender from "./BtnRender";

////////////////
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function ArticleItem({
  article,
  deleteArticle,
  handleOpen,
}) {
  return (
    <div className="container">
      <Card
        sx={{
          maxWidth: 345,
          borderRadius: "18px",
          padding: "15px",
          marginBottom: "25px",
        }}
      >
        
        <CardMedia
          component="img"
          alt={article.Nom}
          height="140"
          image={article.images.url}
          onClick={() => handleOpen(article.Nom,article._id)}
        />
        <CardContent className="article_box">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            title={article.Nom}
          >
            {article.Nom}
          </Typography>
        </CardContent>
        <CardActions>
          <BtnRender article={article} deleteArticle={deleteArticle} />
        </CardActions>
      </Card>
    </div>
  );
}

export default ArticleItem;