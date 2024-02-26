import React from "react";
import { ArrowDropDown } from "@mui/icons-material";
import { useState, Suspense, lazy  } from "react";
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
import { StatusCard } from "./statusCard";
import { FilePathCard } from "./filePathCard";
// import { MetaDataCard } from "./metaDataCard";
import Loading from "./loading.jsx";

const MetaDataCard = lazy(() => import('./MetaDataCard.jsx'))

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

export function MyCard({ tabIndex, cardContent, id }) {
    const [expand, setExpand] = useState(false);

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
                {
                    (tabIndex === 1 && cardContent && <StatusCard status={cardContent} />)
                    || (tabIndex === 2 && cardContent && <FilePathCard paths={cardContent} />)
                    || (tabIndex === 3 && cardContent && 
                    <div>
                        <Suspense fallback={<Loading />}>
                        <MetaDataCard metadata={cardContent}/>
                        </Suspense>
                    </div>
                    )
                    || console.log(tabIndex, " not rendering\n")
                }
            </CardContent>
            </Collapse>
        </Card>
        </div>

        </React.Fragment>
    )
}