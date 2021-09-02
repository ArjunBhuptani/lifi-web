import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

interface MainFeaturedPostProps {
  post: {
    created_at: string;
    description: string;
    excerpt: string;
    html: string;
    title: string;
    feature_image: string;
  };
}

export default function MainFeaturedPost(props: MainFeaturedPostProps) {
  const { post } = props;

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 8,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${post.feature_image})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.feature_image} alt={post.feature_image} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,0)',
        }}
      />
      <Grid container>
        <Grid item md={2}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 10, md: 20 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1"  color="inherit" gutterBottom>
              {"The ultimate cross-chain liquidity aggregator. The future is cross-chain and we make sure you don't have to care."}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
