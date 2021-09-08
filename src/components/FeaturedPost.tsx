import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Link, useHistory } from 'react-router-dom';



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
  const history = useHistory();

  
  const goToProject = () =>    
   history.push({
      pathname: "/post/" + test.slug,
      state:  test 
    })


  return (
    <Grid item xs={12} md={6}>
      <CardActionArea onClick={goToProject}  >
            <Card sx={{ display: 'flex' }}  style={{backgroundColor: "#d4d5d6"}}  >   
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
      </CardActionArea>
    </Grid>
  );
}
