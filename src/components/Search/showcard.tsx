import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { ConvertSlug } from '@/app/utils/api';
interface Iprops {
    id: number
    title: string,
    description: string,
    imgUrl: string
    url: string
}
export default function ShowCard(prop: Iprops) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={`${process.env.NEXT_PUBLIC_BACKEND_URL}upload/images/${prop.imgUrl}`}
                title={prop.title}



            />
            <CardContent>
                <Link style={{ textDecoration: "none", color: 'black' }} href={`/track/${ConvertSlug(prop.title)}-${prop.id}.html`} >
                    <Typography gutterBottom variant="h5" component="div">
                        {prop.title}
                    </Typography>
                </Link>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {prop.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}