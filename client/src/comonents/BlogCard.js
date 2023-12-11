import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Function to format date and time
function formatDateTime(timestamp) {
  const dateTime = new Date(timestamp);
  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, '0');
  const day = String(dateTime.getDate()).padStart(2, '0');
  const hours = String(dateTime.getHours()).padStart(2, '0');
  const minutes = String(dateTime.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';

  return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
}

// Function to get initials from username
function getInitials(name) {
  return name?.split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
  

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

  // Function to handle the edit action
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
    // console.log(id)

  };

  // Function to handle the delete action
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        toast.success("Blog Deleted");
        window.location.reload();
        navigate("/my-blogs");
      }
    } catch (error) {
      console.error(error);
      // You may want to display an error toast or message here
    }
  }

  

  return (
    <Card
      sx={{
        maxWidth: "40%",
        margin: "auto",
        mt: 3,
        mb: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        borderRadius: 4,
        transition: "transform 0.2s ease",
        ":hover": { 
          boxShadow: "10px 10px 20px #ccc",
          transform: "scale(1.02)",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: '#6a5acd'}}
            aria-label="recipe"
          >
            {getInitials(username)}
          </Avatar>
        }
        title={
          <Typography variant="h6" color="primary" fontWeight="bold">
            {username}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="textSecondary">
            Created at {formatDateTime(time)}
          </Typography>
        }
        action={isUser && (              //here action performs as function
          <Box display={"flex"} justifyContent="flex-end">
            {/* Edit button */}
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditIcon color="info" />
            </IconButton>
            {/* Delete button */}
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        )}
      />
      <CardMedia component="img" height="194" image={image} alt="img" />
      <CardContent>
        <Typography variant="h5" color="text.primary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
