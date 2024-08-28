import { Link } from "react-router-dom";

import { PostAuthor, PostCreationTime , ReactionButtons } from "../../components/posts";

const SinglePost = ( { post }) => {
    return (
        <article className="border border-slate-700 w-[40%] h-50 rounded-md flex flex-col gap-2 px-4 py-1 bg-slate-200">
            <h1 className="font-bold text-xl"><Link to={`/posts/${post.id}`} className="hover:text-cyan-700">{ post.title }</Link></h1>
            <p className="leading-relaxed">{ post.body.substring ( 0 , 200 ) }...</p>
            <div className="flex justify-between">
                <Link to={`/users/${post.userId}`} className="hover:text-cyan-700 "><PostAuthor userId = { post.userId }/></Link>
                <PostCreationTime  date = { post.date } />
            </div>
            <ReactionButtons post = { post }/>
        </article>
    )
}

export default SinglePost ; 