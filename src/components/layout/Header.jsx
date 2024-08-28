import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="min-h-[10%] bg-slate-500 flex px-8">
                <nav className="text-2xl text-white font-bold flex items-center justify-between w-full ">

                    <div>
                        <Link to={'/'} className="hover:text-cyan-400">Blog App</Link>
                    </div>

                    <div>
                        <ul className="flex gap-4 justify-between">
                            <li><Link to={'/posts'} className="hover:text-cyan-400">Posts</Link></li>
                            <li><Link to={'/users'} className="hover:text-cyan-400">Users</Link></li>
                        </ul>
                    </div>
                 
                </nav>
        </header>
    )
}

export default Header ; 