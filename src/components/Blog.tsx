import * as React from 'react';
import { useEffect, useState } from 'react';
import './Blog.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Footer from './Footer';
import Box from '@material-ui/core/Box';


const BLOG_URL='https://li-finance-3.ghost.io'
const CONTENT_API_KEY='0f6ce006d81551da10c71bcc85'



type Post = {
  created_at: string;
  description: string;
  excerpt: string;
  html: string;
  title: string;
  feature_image: string;
  slug: string;
}

async function getPosts() {
	// curl ""
	const res = await fetch(
		`${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}`
	).then((res) => res.json())
  
	const posts = res.posts
  console.log(posts)

	return posts
}

const getStaticProps = async () => {
	const posts = await getPosts()
	return {
		revalidate: 10,
		props: { posts }
	}
}

export default function Blog() {
  const [posts, setPosts] = useState<Array<Post>>()
  //const classes = useStyles();
  var test: any[]=[]




async function setupPosts() {
  const newPosts = await getStaticProps()
  setPosts(newPosts.props.posts)

}
useEffect(() => {
    try {
      setupPosts()
    } catch(e) {
        console.log("error");
    }

}, []);
  
if (posts !== undefined){
test=posts
}


  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="xl">
        <Header title="Blog"  />
        <main>        
          <MainFeaturedPost post={test[1]} />
          <Grid container spacing={4}>
            {test.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
          </Grid>
        </main>
      </Container>
      <Footer
        title=""
        description="© 2021 Li.Finance, all rights reserved"
      />
  </div>

  );
}
