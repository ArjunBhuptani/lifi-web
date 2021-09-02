import { useEffect, useState } from 'react';

async function getPost(slug: string) {
	const res = await fetch(
		`${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,html`
	).then((res) => res.json())

	const posts = res.posts

	return posts[0]
}

// Ghost CMS Request


// hello-world - on first request = Ghost CMS call is made (1)
// hello-world - on other requests ... = filesystem is called (1M)


type Post = {
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
  

  
  var featuredPosts = [
	{
	  title: 'Featured post',
	  created_at: 'Nov 12',
	  description:
		'This is a wider card with supporting text below as a natural lead-in to additional content.',
	  html: 'https://source.unsplash.com/random',
	  excerpt: 'Image Text',
	  feature_image: 'Image Text',
  
	}
  ];
  
    
  
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
  
export default function MakePost() {
	const [posts, setPosts] = useState<Array<Post>>()

  
  
  
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
  mainFeaturedPost=posts[1]
  console.log(mainFeaturedPost)
  }
  
  if(posts!==undefined){
  featuredPosts[0]=posts[0]
  featuredPosts[1]=posts[2]
  featuredPosts[2]=posts[3]
  featuredPosts[3]=posts[4]
  featuredPosts[4]=posts[5]
  featuredPosts[5]=posts[6]
  
  }

	return (
		<div>
			<h1>{mainFeaturedPost.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: featuredPosts[5].html}}></div>

			<div id="disqus_thread"></div>
		</div>
	)
}
