'use client'
import Grid from "@mui/material/Grid"
import MediaControlCard from "./MediaCard"

interface Iprops {
    data: IModelPaginate<ITrack> | undefined
}
const CardTrack = (props: Iprops) => {


    let { data } = props
    return (
        <>

            <Grid container spacing={5}>
                {data && data.result.map((item) => {
                    return (

                        <Grid key={item.id} item xs={6}>

                            <MediaControlCard id={item.id} url={item.url} title={item.title} description={item.description} imgUrl={item.imgUrl} />
                        </Grid>
                    )


                })}

            </Grid>
        </>
    )

}
export default CardTrack