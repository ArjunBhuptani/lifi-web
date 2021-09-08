import { Link } from 'react-router-dom';
import  './post.css';
import {  useLocation } from "react-router-dom";

interface Post {
    created_at: string;
    description: string;
    excerpt: string;
    html: string;
    title: string;
    feature_image: string;
	slug: string;
  }

export default function MakePost(test: Post) {
		
    const  location  = useLocation();
	const mainFeaturedPost = location.state as Post;
	console.log(mainFeaturedPost)

    
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
                        <div className="site-foot-nav">
                                <Link to="/"> Li Finance </Link> 
                        </div>
                    </footer>

                </div>
		</div>

	)
}
