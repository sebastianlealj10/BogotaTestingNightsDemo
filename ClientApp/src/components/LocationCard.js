import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function LocationCard({ id, name, type, dimention, resident, image, created }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title="Location"
                />
            <CardContent>
               <Typography gutterBottom variant="h5" component="h2">
               {name}
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
                        <b>Id:</b> {id}
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
                        <b>Type:</b> {type}
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
                        <b>Dimention:</b> {dimention}
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
                        <b>Resident:</b> {resident}
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
                        <b>Created:</b> {created}
               </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
