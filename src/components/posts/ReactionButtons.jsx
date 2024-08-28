const ReactionButtons = ( { post } ) => {

    const reaction = {
        like : '👍' , 
        love : '❤️' , 
        funny : '🤣' , 
        insightful : '💡' 
    }

    return (
        <div className="bg-white rounded-xl  flex gap-2 px-6 justify-between w-[90%] mx-auto">
            {
                Object.entries ( reaction ).map ( 
                    ( [ reactionName , emoji ] ) => {
                        return (
                            <button key = { reactionName } className="flex flex-col">
                                <span>{ emoji }</span> 
                                <span>{ post.reactions [ reactionName ] }</span>
                            </button>
                        )
                    }
                )
            }
        </div>
    )
}

export default ReactionButtons ; 