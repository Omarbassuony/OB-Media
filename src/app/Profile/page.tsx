"use client"
import { Grid } from "@mui/material";
import Addpost from "../_component/addpost/page";
export default function Profile(){

    return(<>
       <Grid container>
        <Grid xs={4}></Grid>
        <Grid xs={8}>
            <Addpost/>
        </Grid>
       </Grid>
    </>)
}