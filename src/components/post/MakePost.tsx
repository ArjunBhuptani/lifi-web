import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import  './post.css';


interface Post {
    created_at: string;
    description: string;
    excerpt: string;
    html: string;
    title: string;
    feature_image: string;
	slug: string;
  }



  var mainFeaturedPost = {
	created_at: 'Title of a longer featured blog post',
	description:
	  "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
	html: "we",
	excerpt: 'https://source.unsplash.com/random',
	title: 'main image description',
	feature_image: 'Continue reading…',
  };
  


    
  
  const BLOG_URL='https://li-finance-3.ghost.io'
  const CONTENT_API_KEY='0f6ce006d81551da10c71bcc85'
  
  

  
  async function getPosts() {
	  // curl ""
	  const res = await fetch(
		  `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}`
	  ).then((res) => res.json())
	
	  const posts = res.posts
  
	  return posts
  }
  
  const getStaticProps = async () => {
	  const posts = await getPosts()
	console.log("static")
	  return {
		  revalidate: 10,
		  props: { posts }
	  }
  }//title: string, html: string


export default function MakePost(test: Post) {
  
  const [posts, setPosts] = useState<Array<Post>>()

  
  if(posts!==undefined){
    mainFeaturedPost=posts[2]
  }

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
	


	return (

		<div className="viewport">
		  <div className="viewport-top">
			 <main className="site-main">
				<article className="content">
					{ mainFeaturedPost.feature_image ?
						<figure className="post-feature-image">
							<img src={ mainFeaturedPost.feature_image } alt={ mainFeaturedPost.title } />
						</figure> : null }
					<section className="post-full-content">
						<h1 className="content-title">{mainFeaturedPost.title}</h1>

						{/* The main post content */ }
						<div
							className="content-body load-external-scripts"
							dangerouslySetInnerHTML={{ __html: mainFeaturedPost.html }}
						/>
				    </section>
				</article>

		  	 </main>

			</div>


				<div className="viewport-bottom">
                    {/* The footer at the very bottom of the screen */}
                    <footer className="site-foot">
                        <div className="site-foot-nav container">
                            <div className="site-foot-nav-left">
                                <Link to="/">{mainFeaturedPost.title}</Link> © 2021  <a className="site-foot-nav-item" href="https://li.finance" target="_blank" rel="noopener noreferrer">Li Finance</a>
                            </div>
                        </div>
                    </footer>

                </div>
		</div>

	)
}
