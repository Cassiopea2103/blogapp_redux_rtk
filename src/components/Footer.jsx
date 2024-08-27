import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="min-h-[10%] bg-slate-500 flex justify-between items-center px-4 text-white">
            <span>
                By &nbsp;
                <strong>
                    <Link to={'https://www.linkedin.com/in/cassiopea21/'} target="_blank" className="hover:text-cyan-400">cassiopea</Link>
                </strong>
            </span>
            <span>27-04-2024 , All right reserved &copy;</span>
        </footer>
    )
}

export default Footer ; 