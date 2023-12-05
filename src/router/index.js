import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from "../components/login/Login";
// import Welcome from "../views/Welcome";
// import Index from "../components/Index";
// import About from "../components/About";
// import Blog from "../components/Blog";
// import Project from "../components/Project";
// import Message from "../components/Message";
// import Essay from "../components/Essay";
// import Home from "../views/Home";
// import Blogs from "../components/admin/Blogs";
// import Blog_input from "../components/admin/Blog_input";
// import Tags from "../components/admin/Tags";
// import Types from "../components/admin/Types";
// import AdminIndex from "../components/admin/AdminIndex";
// import Comments from "../components/admin/Comments";
// import Essays from "../components/admin/Essays";
// import Projects from "../components/admin/Projects";
// import Administrator from "../components/admin/Administrator";
// import Users from "../components/admin/Users";
// import Error from "../components/Error";
// import Pictures from "../components/admin/Pictures";

// 路由懒加载
const Welcome = () => import(/* webpackChunkName: "Welcome" */ '../views/Welcome')
const Index = () => import(/* webpackChunkName: "Welcome" */ '../components/Index')
const About = () => import(/* webpackChunkName: "Welcome" */ '../components/About')
const Project = () => import(/* webpackChunkName: "Welcome" */ '../components/Project')
const Message = () => import(/* webpackChunkName: "Welcome" */ '../components/Message')
const Essay = () => import(/* webpackChunkName: "Welcome" */ '../components/Essay')

const Blog = () => import(/* webpackChunkName: "Blog" */ '../components/Blog')

const Home = () => import(/* webpackChunkName: "Home" */ '../views/Home')
const AdminIndex = () => import(/* webpackChunkName: "Home" */ '../components/admin/AdminIndex')

const Blogs = () => import(/* webpackChunkName: "Blog_Home" */ '../components/admin/Blogs')
const Blog_input = () => import(/* webpackChunkName: "Blog_Home" */ '../components/admin/Blog_input')

const Tags = () => import(/* webpackChunkName: "Tags" */ '../components/admin/Tags')
const Types = () => import(/* webpackChunkName: "Types" */ '../components/admin/Types')

const Essays = () => import(/* webpackChunkName: "Essay" */ '../components/admin/Essays')

const Projects = () => import(/* webpackChunkName: "Projects" */ '../components/admin/Projects')

const Comments = () => import(/* webpackChunkName: "Comment" */ '../components/admin/Comments')

const Administrator = () => import(/* webpackChunkName: "Admin" */ '../components/admin/Administrator')
const Users = () => import(/* webpackChunkName: "User" */ '../components/admin/Users')

const Error = () => import(/* webpackChunkName: "Error" */ '../components/Error')
const Pictures = () => import(/* webpackChunkName: "Pictures" */ '../components/admin/Pictures')



Vue.use(VueRouter)

const routes = [
    {
        path: '/error',
        component: Error
    },
    {
        path: '/',
        component: Welcome,
        redirect: '/index',
        children: [
            {path: '/index', component: Index},
            {path: '/about', component: About},
            {path: '/blogInfo', component: Blog},
            {path: '/project', component: Project},
            {path: '/message', component: Message},
            {path: '/essay', component: Essay},
        ]
    },
    {
        path: '/admin',
        component: Home,
        // 挂载路由导航守卫
        beforeEnter: (to, from, next) => {
            // to 将要访问的路径
            // from 代表从哪个路径跳转而来
            // next 是一个函数，表示放行
            // next() 放行  next('login') 强制跳转
            const userInfo = JSON.parse(window.sessionStorage.getItem('user'))
            // console.log(userInfo)
            if (!userInfo) return next('/error')
            else {
                const type = userInfo.type
                // console.log(type)
                if (type !== '1') return next('/error')
                next()
            }
            next()
        },
        redirect: '/admin/index',
        children: [
            {path: '/admin/index', component: AdminIndex},
            {path: '/admin/blogs', component: Blogs},
            {path: '/admin/blog-input', component: Blog_input},
            {path: '/admin/administrator', component: Administrator},
            {path: '/admin/types', component: Types},
            {path: '/admin/tags', component: Tags},
            {path: '/admin/comments', component: Comments},
            {path: '/admin/essays', component: Essays},
            {path: '/admin/projects', component: Projects},
            {path: '/admin/users', component: Users},
            {path: '/admin/pictures', component: Pictures}
        ]
    }
]

const router = new VueRouter({
    routes
})


export default router
