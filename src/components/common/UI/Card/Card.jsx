import React from "react";
import { useState, Suspense, lazy } from "react";
import { styled } from "@mui/material/styles";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { StatusCard } from "./statusCard.jsx";
import { FilePathCard } from "./filePathCard.jsx";
import { CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";

/*
    Except for inputForm, all the other tabs make use of the card component to render data. It's passed from the parents to
    the children(<Tab name>Card) and the individual rendering is taken care there.
*/

// lazy load the MetaDataCard component
const MetaDataCard = lazy(() => import('../../../earthaccess/UI/Card/MetaDataCard.jsx'))

const LazyLoading = () => {
    return <p><i>Loading...</i></p>; // fallback component for Suspense
}

// styled IconButton component for expand/collapse functionality
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

// conditionally rendering card content based on tab index
export function MyCard({ tabIndex, cardContent, id, timestamp, shortName, onCheck, downloadComplete }) {
    const [expand, setExpand] = useState(false);
    const uniqueId = `${shortName} - ${new Date(timestamp).toLocaleString("en-US", {
        year: "numeric", month: "numeric", day: "numeric",
        hour: "numeric", minute: "numeric", hour12: true
    })}`;

    const handleExpandClick = () => {
        setExpand(!expand);
    };

    return (
        <React.Fragment>
            <div style={{ padding: 20 }} >
                <Card style={{ textAlign: "center" }}>
                    <CardActions sx={{ padding: 0 }}>
                        <Grid container alignItems="center">
                            <Grid item xs={1}>
                                {tabIndex == 1 && <Checkbox size="small" color="primary" onClick={() => onCheck(id)} />}
                            </Grid>
                            <Grid item xs={11}>
                                <CardHeader title={uniqueId} sx={{ textAlign: "center" }}
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
                            </Grid>
                        </Grid>
                    </CardActions>
                    <Collapse in={expand} timeout="auto" unmountOnExit>
                        <CardContent sx={{ flexGrow: 1, overflow: 'auto' }}>
                            {
                                (tabIndex === 1 && cardContent && <StatusCard key={id} jobid={id} status={cardContent} />)
                                || (tabIndex === 2 && <FilePathCard key={id} jobid={id} onExpand={expand} downloadComplete={downloadComplete} />)
                                || (tabIndex === 3 &&
                                    <div>
                                        <Suspense fallback={LazyLoading}>
                                            <MetaDataCard key={id} jobid={id} onExpand={expand} downloadComplete={downloadComplete} />
                                        </Suspense>
                                    </div>
                                )
                            }
                        </CardContent>
                    </Collapse>
                </Card>
            </div>
        </React.Fragment>
    )
}