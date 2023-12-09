import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
// import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
// import IconButton, { } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: "40%",
        margin: "auto",
        mt: 3,
        mb: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": { boxShadow: "10px 10px 20px #ccc" },
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={handleEdit}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //   </IconButton>
        // }
        title={username}
        subheader={["Created at ", time]}
      />
      <CardMedia component="img" height="194" image={image} alt="img" />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Title : {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description:{description}
        </Typography>
      </CardContent>
    </Card>
  );
}
