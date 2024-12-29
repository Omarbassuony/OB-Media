// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
// import IconButton, { IconButtonProps } from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { Box } from '@mui/material';
// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// export default function SinglePost({postdetails}:any) {
//     console.log(postdetails);
    
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <Card className='mb-4 w-full mx-auto' sx={{ maxWidth: 345 }}>
//       <CardHeader
//         avatar={
//           <Avatar src={postdetails.user.photo} sx={{ bgcolor: red[500] }} aria-label="recipe">
//             R
//           </Avatar>
//         }
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title={postdetails.user.name}
//         subheader="September 14, 2016"
//       />
//       <CardMedia
//         component="img"
//         height="194"
//         image={postdetails.image}
//         alt="Paella dish"
//       />
//       <CardContent>
//         <Typography variant="body2" color="text.secondary">
//             {postdetails.body}
//         </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//           <FavoriteIcon />
//         </IconButton>
//         <IconButton aria-label="share">
//           <ShareIcon />
//         </IconButton>
//         <ExpandMore
//           expand={expanded}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </ExpandMore>
//       </CardActions>
//       <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <CardContent>
//             {postdetails.comments.map((comment:any)=>
//             <Box>
//             <Box className="flex items-center">
//                 <Avatar className='w-1 h-1 mr-2' src={comment.commentCreator.photo} />
//                 <h5>{comment.commentCreator.name}</h5>
//             </Box>
//           <Typography paragraph>
//             {comment.content}
//         </Typography>
//         </Box>
//             )}

//         </CardContent>
//       </Collapse>
//     </Card>
//   );
// }
"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import Image from "next/image";
import { addComment} from "@/app/redux/slices/commentSlice";

import { Fab, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
export default function SinglePostDetails() {
  const { post } = useSelector((state: RootState) => state.posts);

  const dispatch = useDispatch<AppDispatch>();

  const [content, setContent] = React.useState<{ content: string } | null>(
    null
  );

  function handelComment(e: React.ChangeEvent<HTMLInputElement>) {
    setContent({
      content: e.target.value,
    });
  }
  return (
    <>
      {post && (
        <Card key={post._id} className="mb-4">
          <CardHeader
            avatar={
              <Avatar className="bg-mainColor" aria-label="recipe">
                <Image
                  src={post.user.photo}
                  alt={post.user.name}
                  width={150}
                  height={150}
                />
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={post.user.name}
            subheader={post.createdAt.slice(0, 10)}
          />
          {post.image && (
            <CardMedia
              component="img"
              height="194"
              image={post.image}
              alt={post.body}
            />
          )}

          <CardContent>
            <Typography
              component="div"
              variant="body2"
              sx={{ color: "text.secondary" }}
            >
              {post.body}
            </Typography>
          </CardContent>

          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <div className="flex justify-center items-center mx-auto w-2/3">
              <TextField
                id="content"
                label="Comment"
                className="w-5/6 me-2"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handelComment(e);
                }}
              />
              <Fab
                onClick={() => {
                  if (content) {
                    dispatch(addComment({ content, id: { post: post._id } }));
                  }
                }}
                type="submit"
                size="medium"
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
            </div>
          </CardActions>
          {post.comments.length > 0 && (
            <Collapse in={true} timeout="auto" unmountOnExit>
              <Typography
                component="div"
                className="px-2"
                sx={{ marginBottom: 2 }}
              >
                Comments:
              </Typography>
              {post.comments.map((comment) => (
                <CardContent className="border-b" key={comment._id}>
                  <CardHeader
                    avatar={
                      <Avatar className="bg-mainColor" aria-label="recipe">
                        {comment.commentCreator.name.slice(0, 1).toUpperCase()}
                      </Avatar>
                    }
                    title={comment.commentCreator.name}
                    subheader={comment.createdAt.slice(0, 10)}
                  />
                  <Typography
                    component="div"
                    className="px-9 py-3"
                    sx={{ marginBottom: 2 }}
                  >
                    {comment.content}
                  </Typography>
                </CardContent>
              ))}
            </Collapse>
          )}
        </Card>
      )}
    </>
  );
}
