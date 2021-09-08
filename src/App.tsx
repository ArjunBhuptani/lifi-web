import { WalletOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, Redirect, BrowserRouter} from 'react-router-dom';
import './App.css';
import logo from './assets/icon192.png';
import AboutPage from './components/AboutPage';
import Dashboard from './components/Dashboard';
import Blog from './components/Blog';
import NotFoundPage from './components/NotFoundPage';
import Swap from './components/Swap';
import Web3ConnectionManager from './components/web3/Web3ConnectionManager';
import WrappedWeb3ReactProvider from './components/web3/WrappedWeb3ReactProvider';
import analytics from './services/analytics';
import setMetatags from './services/metatags';
import { initStomt } from './services/stomt';
import MakePost from './components/post/MakePost';
import Faq from './components/Faq';



const BLOG_URL='https://li-finance-3.ghost.io'
const CONTENT_API_KEY='0f6ce006d81551da10c71bcc85'



interface Post {
  created_at: string,
  description: string,
  excerpt: string,
  html: string,
  title: string,
  feature_image:string,
  slug: string
}


async function getPosts() {
	// curl ""
	const res = await fetch(
		`${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}`
	).then((res) => res.json())
  
	const posts = res.posts
	return posts
}

async function getPages() {
	// curl ""
	const res = await fetch(
		`${BLOG_URL}/ghost/api/v3/content/pages/?key=${CONTENT_API_KEY}`
	).then((res) => res.json())
  
	const posts = res.pages
	return posts
}

const getStaticProps = async () => {
	const posts = await getPosts()
  const pages = await getPages()
	return {
		posts: { posts },
    pages: { pages }
	}
}


function usePageViews() {
  const [path, setPath] = useState<string>()

  const currentPath = (window as any).location.pathname === '/' ? '/swap' : (window as any).location.pathname
  if (path !== currentPath) {
    setPath(currentPath)
  }

  useEffect(() => {
    if (path) {
      analytics.sendPageView(path)
    }
  }, [path])

  return path
}



function App() {
  
  const path = usePageViews()
  const [posts, setPosts] = useState<Array<Post>>()
  const [pages, setPages] = useState<Array<Post>>()

  var test: Post[]=[]
  var test2: Post[]=[]

  
  async function setupPosts() {
    const newPosts = await getStaticProps()
    setPosts(newPosts.posts.posts)  
    setPages(newPosts.pages.pages)  

  }

  useEffect(() => {
      try {
        setupPosts()
      } catch(e) {
          console.log("error");
      }
  
  }, []);
    
  if (posts !== undefined && pages!== undefined){
     test2=posts
     test=pages
  }


  return (
    <BrowserRouter>
      <WrappedWeb3ReactProvider>
        <Web3ConnectionManager>
          <Layout>
            <Header style={{ position: 'fixed', zIndex: 900, width: '100%', padding: 0 }}>
              <Link to="/" className="wordmark">
                <img src={logo} className="logo" alt={process.env.REACT_APP_PROJECT_NAME} />
                <span>Li.Finance</span>
              </Link>
              <Menu theme="light" mode="horizontal" defaultSelectedKeys={path ? [path] : []}>
                <Menu.Item key="/dashboard">
                  <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="/swap">
                  <span className="beta-badge">Beta</span>
                  <Link to="/swap">Swap</Link>
                </Menu.Item>
                <Menu.Item key="/about">
                  <Link to="/about">About</Link>
                </Menu.Item>
                <Menu.Item key="/blog">
                  <Link to="/blog">Blog</Link>
                </Menu.Item>    
                <Menu.Item key="/faq">
                  <Link to="/faq">FAQ</Link>
                </Menu.Item>              
                { false && <Menu.Item key="wallets" style={{float: "right"}}>
                  <Button shape="round" icon={<WalletOutlined />} >
                    Add Wallets
                  </Button>
                </Menu.Item> }
              </Menu>
            </Header>

            <Switch>
              <Redirect exact from="/" to="/swap" />
              <Route path="/dashboard" render={() => {
                setMetatags({
                  title: 'Li.Finance - Dashboard',
                })
                initStomt('dashboard')
                return <Dashboard/>
              }}/>
              <Route path="/swap" render={() => {
                setMetatags({
                  title: 'Li.Finance - Swap',
                })
                initStomt('swap')
                return <Swap/>
              }}/>
              <Route path="/about" render={() => {
                setMetatags({
                  title: 'Li.Finance - About',
                })
                initStomt('lifi')
                return <AboutPage {...test[0]}/>
              }}/>
              <Route path="/faq" render={() => {
                setMetatags({
                  title: 'Li.Finance - FAQ',
                })
                initStomt('lifi')
                return <Faq {...test}/>
              }}/>                
              <Route path="/blog" render={() => {
                setMetatags({
                  title: 'Li.Finance - Blog',
                })
                initStomt('lifi')
                return <Blog {...test2}/>
              }}/>                         
               <Route path="/post/:name" 
                component={MakePost}
              />                     
              <Route path="*" render={() => {
                setMetatags({
                  title: 'Li.Finance - Not Found',
                  status: 404,
                })
                initStomt('lifi')
                return <NotFoundPage/>
              }}/>
            </Switch>
          </Layout>
        </Web3ConnectionManager>
      </WrappedWeb3ReactProvider>
    </BrowserRouter>
  );
}

export { App };
