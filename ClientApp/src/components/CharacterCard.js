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
        maxHeight: 
    },
    media: {
        height: 140,
    },
});

export default function CharacterCard({ id, name, status, species, type, gender, location, image, episode, created }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title="Character"
                />
            <CardContent>
               <Typography gutterBottom variant="h5" component="h2">
               {name}
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
               Id: {id}
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
               Status: {status}
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
               Species: {species}
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
               Type: {type}
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
               Gender: {gender}
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
               Location: {location}
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
               Episode: {episode}
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
               Created: {created}
               </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
