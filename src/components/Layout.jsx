import Header from "./Header"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"

const Layout = () => {
    return (
        <main className="min-h-screen h-screen">
            <Header />
            <div className="min-h-[80%] bg-slate-300">
                <Outlet/>
            </div>
            <Footer />
        </main>
    )
}

export default Layout ;  