import * as React from 'react';
import './Blog.css';
import Grid from '@material-ui/core/Grid';
import FeaturedPost from './FeaturedPost';
import Footer from './Footer';



interface Post  {
  created_at: string,
  description: string,
  excerpt: string,
  html: string,
  title: string,
  feature_image:string,
  slug: string
  }




export default function Blog( post: Post[]) {
  
var test = Object.values(post)


  return (
   <>
      <div className="viewport">
          <header className="site-head" >
              <main>      
                <div className="site-banner">
                  <h1 className="site-banner-title">Li-Finance</h1>
                  <p className="site-banner-desc">Cross-Chain Swap Aggregation</p>
                </div>   
                  <Grid container spacing={4}  >
                    {test.map((post) => (
                      <FeaturedPost  {...post} />
                    ))}
                  </Grid>
                  <Grid container spacing={5} sx={{ mt: 3 }}>
                  </Grid>
              </main>
          </header>

            <Footer 
              title=""
              description="© 2021 Li.Finance, all rights reserved"
            />
      
      </div>

    </>

  );
}
