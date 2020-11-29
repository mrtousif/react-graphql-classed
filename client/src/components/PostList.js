import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { Grid } from "@material-ui/core";
import Post from "./Post";
import Loading from "./Loading";
import { GET_POSTS, GET_LIKED_POSTS } from "../graphql/graphql";
import UserProvider from "../contexts/UserProvider";

function PostList(props) {
    const userCtx = React.useContext(UserProvider.context);
    // const [posts, setPosts] = React.useState(null);
    const { loading, error, data } = useQuery(GET_POSTS, {
        // pollInterval: 5000,
    });
    const [getLikedPosts, { data: fetchedData }] = useLazyQuery(GET_LIKED_POSTS);
    const [likedPostReceived, setLikedPostReceived] = useState(false);

    console.log("PostList");

    React.useEffect(() => {
        if (!likedPostReceived && userCtx.user) {
            getLikedPosts({
                variables: {
                    userId: userCtx.user._id,
                },
            });
            setLikedPostReceived(true);
        }
    }, [likedPostReceived, userCtx.user, fetchedData, getLikedPosts]);

    if (loading) return <Loading />;
    if (error) return <p>Error :(</p>;

    let viewPosts;
    if (userCtx.user && fetchedData && data) {
        viewPosts = data.getPosts.map((post) => {
            const postLiked = fetchedData.getLikedPosts.find((likedPost) => {
                return likedPost.postId === post._id;
            });

            return (
                <Post post={post} key={post._id} userLiked={postLiked ? true : false} />
            );
        });
    } else {
        viewPosts = data.getPosts.map((post) => <Post post={post} key={post._id} />);
    }

    return <Grid container>{viewPosts}</Grid>;
}

export default PostList;
