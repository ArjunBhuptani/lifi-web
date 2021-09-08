import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';


interface Post {
  created_at: string,
  description: string,
  excerpt: string,
  html: string,
  title: string,
  feature_image:string,
  slug: string
}



export default function Faq(page: Post[] ) {

    const history = useHistory();
    
    var test = page[0]
  
    const goToProject = () =>    
     history.push({
        pathname: "/post/" + test.slug,
        state:  test 
      })
  

   page = Object.values(page)
   console.log(page[3].html)
  
    


    return (
        <>
             <div className="viewport">
               <div className="viewport-top">
                  <main className="site-main">
                     <article className="content">
                         { page[3].feature_image ?
                             <figure className="post-feature-image">
                                 <img src={ page[3].feature_image } alt={ page[3].title } />
                             </figure> : null }
                         <section className="post-full-content">
                             <h1 className="content-title">{page[3].title}</h1>
     
                             {/* The main post content */ }
                             <div
                                 className="content-body load-external-scripts"
                                 dangerouslySetInnerHTML={{ __html: page[3].html }}
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