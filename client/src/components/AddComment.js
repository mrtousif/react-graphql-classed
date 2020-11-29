import React, { useState } from "react";
import {
    // Container,
    Grid,
    TextField,
    Avatar,
    Button,
    Box,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserProvider from "../contexts/UserProvider";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT, GET_COMMENTS_OF_POST } from "../graphql/graphql";

function AddComment(props) {
    const { postId } = props;
    const [comment, setComment] = useState(props.comment || "");
    const [postBtnPressed, setPostBtnPressed] = useState(false);
    const [focus, setFocus] = useState(false);
    // const [postedComments, setPostedComments] = useState([]);
    const userCtx = React.useContext(UserProvider.context);

    const [addComment, { loading }] = useMutation(CREATE_COMMENT, {
        update(proxy, result) {
            try {
                const data = proxy.readQuery({
                    query: GET_COMMENTS_OF_POST,
                });

                console.log(data);
                // proxy.writeQuery({
                //     query: GET_COMMENTS_OF_POST,
                //     data: {
                //         getComments: [result.data.createComment, ...data.getComments],
                //     },
                // });
                setComment("");
                setPostBtnPressed(false);
            } catch (error) {
                console.error(error);
            }
        },

        onError(err) {
            console.warn(err);
            return err;
        },
    });

    const handleChange = (event, value) => {
        setComment(event.target.value);
    };

    const submitComment = async () => {
        if (!userCtx.user) return;
        if (!comment || comment.length < 2) return;
        setPostBtnPressed(true);
        // const sanitizedComment = sanitize(comment);
        addComment({
            variables: {
                body: comment,
                postId,
            },
        });
        setComment("");
    };

    const onCancel = () => {
        setComment("");
    };

    const buttonComponent = (
        <Box marginY={1}>
            <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: "10px" }}
                onClick={() => {
                    submitComment();
                    setFocus(false);
                }}
                disabled={postBtnPressed}
            >
                Submit
            </Button>

            <Button
                variant="outlined"
                color="default"
                onClick={() => {
                    onCancel();
                    setFocus(false);
                }}
                disabled={postBtnPressed}
            >
                Cancel
            </Button>
        </Box>
    );

    return (
        <Grid
            container
            spacing={1}
            style={{ marginTop: "0.5rem", marginBottom: "0.5em" }}
        >
            <Grid item style={{ marginRight: "0.5em", marginTop: "0.5em" }}>
                <Avatar
                    alt={userCtx.user && userCtx.user.name ? userCtx.user.name : ""}
                    src={userCtx.user && userCtx.user.photo ? userCtx.user.photo : ""}
                />
            </Grid>

            <Grid item xs>
                {loading ? (
                    <div
                        style={{
                            position: "absolute",
                            marginLeft: "1em",
                            marginTop: "0.5em",
                        }}
                    >
                        <CircularProgress />
                    </div>
                ) : null}

                <TextField
                    id="add-comment"
                    placeholder={
                        userCtx.user ? "Add a comment" : "Log in to post a comment"
                    }
                    value={comment}
                    fullWidth
                    variant="outlined"
                    multiline
                    onChange={handleChange}
                    onFocus={() => setFocus(true)}
                    disabled={postBtnPressed}
                />

                {focus ? buttonComponent : null}
                {/* userLoggedIn ? buttonComponent : null */}
            </Grid>
        </Grid>
    );
}

export default AddComment;
