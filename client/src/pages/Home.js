import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import PostList from "../components/PostList";
import AddPost from "../components/AddPost";
import Notification from "../components/Notification";
// import { GET_LIKED_POSTS } from "../graphql/graphql";
// import { useLazyQuery } from "@apollo/client";
// import UserProvider from "../contexts/UserProvider";

function Home() {
    const [errMsg, setErrMsg] = React.useState("");

    // const { data } = useQuery(GET_LIKED_POSTS, {
    //     variables: {
    //         userId: userCtx.user._id,
    //     },
    // });

    return (
        <Container maxWidth="md">
            <Notification message={errMsg} />
            <Grid container direction="column" spacing={1}>
                <AddPost setErrMsg={setErrMsg} />
                <Typography gutterBottom>Recent Posts</Typography>
                <PostList />
            </Grid>
        </Container>
    );
}

export default Home;
