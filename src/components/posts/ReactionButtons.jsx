const ReactionButtons = ( { post } ) => {

    const reaction = {
        like : '👍' , 
        love : '❤️' , 
        funny : '🤣' , 
        insightful : '💡' 
    }

    return (
        <div className="bg-white rounded-xl  flex gap-2 px-2 justify-between w-[85%] mx-auto">
            {
                Object.entries ( reaction ).map ( 
                    ( [ reactionName , emoji ] ) => {
                        return (
                            <button className="flex flex-col">
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