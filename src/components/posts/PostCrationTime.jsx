import { parseISO , formatDistanceToNow } from 'date-fns' ; 

const PostCreationTime = ( { date }) => {

    const timestamp = formatDistanceToNow ( parseISO ( date ) ) ;

    return (
        <span>{ timestamp } ago</span>
    )
}

export default PostCreationTime ; 