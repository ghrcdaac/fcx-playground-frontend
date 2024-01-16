import React from "react";
import { ArrowDropDown } from "@mui/icons-material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from "@mui/material/CardActions";
import CardContent from '@mui/material/CardContent';
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearAllIcon from '@mui/icons-material/ClearAll';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

export function MyCard({ status, id }) {
    const [expand, setExpand] = useState();

    const handleExpandClick = () => {
        setExpand(!expand);
    };

    return (
        <React.Fragment>
        <div style={{ padding: 20 }} >
        <Card style={{ textAlign: "center" }}>
            <CardHeader title={id}
            action={
                <div>
                    <ExpandMore
                    expand={expand}
                    onClick={handleExpandClick}
                    aria-expanded={expand}
                    aria-label="show more"
                    >
                    <ExpandMoreIcon />
                    </ExpandMore>
                </div>
              }>
            </CardHeader>
            <Collapse in={expand} timeout="auto" unmountOnExit>
            <CardContent sx={{maxHeight: '10vh', overflow: 'auto' }}>
            {status.map((item) => (<p>{item}</p>))}
            </CardContent>
            </Collapse>
        </Card>
        </div>

        </React.Fragment>
    )
}