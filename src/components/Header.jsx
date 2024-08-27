import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="min-h-[10%] bg-slate-500 flex items-center justify-end pr-8">
                <nav className="text-2xl text-white font-bold">
                    <ul className="flex gap-2">
                        <li><Link to={'/'} className="hover:text-cyan-400">Home</Link></li>
                        <li><Link to={'/posts'} className="hover:text-cyan-400">Posts</Link></li>
                        <li><Link to={'/users'} className="hover:text-cyan-400">Users</Link></li>
                    </ul>
                </nav>
        </header>
    )
}

export default Header ; 