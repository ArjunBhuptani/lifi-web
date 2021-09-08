import * as React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';


interface Post {
  created_at: string,
  description: string,
  excerpt: string,
  html: string,
  title: string,
  feature_image:string,
  slug: string
}


export default function AboutPage( test : Post) {



 return (
   <>
		<div className="viewport">
		  <div className="viewport-top">
        
			 <main className="site-main">
				<article className="content ">
					{ test.feature_image ?
						<figure className="post-feature-image">
							<img src={ test.feature_image } alt={ test.title } />
						</figure> : null }
					<section className="post-full-content">
						<h1 className="content-title">{test.title}</h1>

						{/* The main post content */ }
						<div
							className="content-body load-external-scripts"
							dangerouslySetInnerHTML={{ __html: test.html }}
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

    </>

  );
}
