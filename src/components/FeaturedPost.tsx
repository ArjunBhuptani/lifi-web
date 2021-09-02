import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Link, Route } from 'react-router-dom';



interface Post  {
  created_at: string;
  description: string;
  excerpt: string;
  html: string;
  title: string;
  feature_image: string;
  slug: string;
}

export default function FeaturedPost( test: Post ) {


  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href={"/post/write"}>
        <Route path="/blog/write" />  
          <div onClick={() =>  <Link to="/post/write">  </Link>  }>
            <Card sx={{ display: 'flex' }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                  {test.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {test.created_at.substring(0,10)}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {test.excerpt}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  Continue reading...
                </Typography>
                <Link to={"/post/write"}>  </Link>  
              </CardContent>
              <CardMedia
                component="img"
                sx={{ width: 260, display: { xs: 'none', sm: 'block' } }}
                image={test.feature_image}
                alt={test.excerpt}
              />
            
          </Card>
          </div>
      </CardActionArea>
    </Grid>
  );
}
