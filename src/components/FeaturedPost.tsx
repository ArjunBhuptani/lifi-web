import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Link, Route } from 'react-router-dom';
import MakePost from './post/MakePost';

interface FeaturedPostProps {
  post: {
    created_at: string;
    description: string;
    excerpt: string;
    html: string;
    title: string;
    feature_image: string;
    slug: string;
  };
}

export default function FeaturedPost(props: FeaturedPostProps ) {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href={"/post/"+post.slug}>
      <Route path="/post/write"  component={MakePost}/> 
      <div onClick={() =>  <Link to="/post/write"></Link> }>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.created_at.substring(0,10)}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.excerpt}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
            <Link to={"/post/write"}>  </Link>  
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.feature_image}
            alt={post.excerpt}
          />
         
       </Card>
       </div>
      </CardActionArea>
    </Grid>
  );
}
