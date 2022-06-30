import React from "react";
import ReactLoading from "react-loading";
import { list } from "./Generic";
import { Grid, Typography } from "@material-ui/core";
import "./styles.css";

const Loading = () => (
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
    >
        {list.map(l => (
            <Grid 
            item xs={12} 
            key={l.prop}
            >
                <Typography variant="h5">Loading</Typography>
                <ReactLoading type={l.prop} color="secondary" />
            </Grid>
        ))}

    </Grid>
);

export default Loading;