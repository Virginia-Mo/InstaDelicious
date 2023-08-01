import * as React from 'react';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Post, UserDB } from '@/types/models';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useAppSelector } from '@/types/reduxTypes';
import { AddLikes, MinusLikes } from '@/async_calls/likes';
import { redirect } from 'next/navigation';
import { set } from 'react-hook-form';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function CardPost({post} : {post: Post}) {
  const [expanded, setExpanded] = React.useState(false);
  const [like, setLike] = React.useState(false);
  const [like2, setLike2] = React.useState(true);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleLike = () => {
    AddLikes(post.id, onlineUser.id)
    setLike(true)
  }
  const handleMinusLike = () => {
    MinusLikes(post.id, onlineUser.id)
    setLike(false)
  }
  const postAuthor = post.authorId 
  const users = useAppSelector((state) => state.persistedReducer.user.users)
  const user = users.find((user) => user.id === postAuthor)
  const onlineUser = useAppSelector((state) => state.persistedReducer.user.onlineUser)
  useEffect(() => {
  if (post.like && post.like.userslikes.includes(onlineUser.id)) {
    setLike(true)
  }
}, [post.like])
  return (
    <Card sx={{ maxWidth: 600 }} className='CardA'>
      <CardHeader
        avatar={
          <Avatar sx={{ width: 58, height: 58}} aria-label="recipe" src={user?.picture} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user?.username}
        subheader={post.title}
      />
      <CardMedia
        component="img"
        height="194"
        image={post.url}
        alt={post.title}
        className='CardImage'
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {post.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {(like) && 
          <FavoriteIcon color="secondary" onClick={handleMinusLike}/> }
          {(!like) &&
          <FavoriteIcon onClick={handleLike}/>
          }
        </IconButton>
        <BookmarkIcon color="disabled" aria-label="bookmark">
          <ShareIcon />
        </BookmarkIcon>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph className='italic'>Ingredients:</Typography>
           {post.ingredients.map((ingredient) => (
              <Typography paragraph> - {ingredient}</Typography>
           ))
          }
          <Typography paragraph className='italic'>
            Details : 
          </Typography>
          <Typography paragraph>
            {post.details}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}