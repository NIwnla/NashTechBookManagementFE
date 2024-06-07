import { useRoutes } from "react-router-dom"
import Login from "../pages/authentication/Login"
import NotFound from "../pages/NotFound"
import Home from "../pages/Home"
import BookIndex from "../pages/book/BookIndex"
import BookDetail from "../pages/book/BookDetail"
import BookUpdate from "../pages/book/BookUpdate"
import BookCreate from "../pages/book/BookCreate"
import CategoryIndex from "../pages/category/CategoryIndex"
import CategoryCreate from "../pages/category/CategoryCreate"
import CategoryUpdate from "../pages/category/CategoryUpdate"
import Register from "../pages/authentication/Register"
import RequestIndex from "../pages/request/RequestIndex"
import RequestCreate from "../pages/request/RequestCreate"


export const AppRoutes = () => {
    const elements = useRoutes(
        [
            { path: '/login', element: <Login />, errorElement: <NotFound /> },
            { path: '/register', element: <Register />, errorElement: <NotFound /> },
            { path: '/books', element: <BookIndex />, errorElement: <NotFound /> },
            { path: '/books/:id', element: <BookDetail />, errorElement: <NotFound /> },
            { path: '/books/:id/update', element: <BookUpdate />, errorElement: <NotFound /> },
            { path: '/books/create', element: <BookCreate />, errorElement: <NotFound /> },
            { path: '/categories', element: <CategoryIndex />, errorElement: <NotFound /> },
            { path: '/categories/create', element: <CategoryCreate />, errorElement: <NotFound /> },
            { path: '/categories/:id/update', element: <CategoryUpdate   />, errorElement: <NotFound /> },
            { path: '/requests/user/:id', element: <RequestIndex />, errorElement: <NotFound /> },
            { path: '/requests', element: <RequestIndex />, errorElement: <NotFound /> },
            { path: '/requests/create', element: <RequestCreate />, errorElement: <NotFound /> },
            { path: '/', element: <Home />, errorElement: <NotFound /> },
            { path: '/home', element: <Home />, errorElement: <NotFound /> }
            // { path: '*', element: <NotFound /> }
        ]
    )
    return elements
}
