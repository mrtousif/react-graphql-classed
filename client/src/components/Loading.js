import React from "react";
import { CircularProgress } from "@material-ui/core";

function Loading() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 100,
            }}
        >
            <CircularProgress />
        </div>
    );
}

export default Loading;
