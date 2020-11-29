import React from "react";
import Comment from "./Comment";
import { Grid } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS_OF_POST } from "../graphql/graphql";
import Loading from "./Loading";
import AddComment from "./AddComment";

function CommentList(props) {
    const { postId } = props;
    const { loading, error, data } = useQuery(GET_COMMENTS_OF_POST, {
        variables: {
            postId,
        },
    });

    if (loading) return <Loading />;
    if (error) return <p>Error :(</p>;
    // React.useEffect(()=> {

    // })

    return (
        <Grid container>
            <AddComment postId={postId} />
            {data.getComments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
            ))}
        </Grid>
    );
}

export default CommentList;
