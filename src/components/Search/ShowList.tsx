'use client'
import Grid from "@mui/material/Grid"
import MediaControlCard from "../MediaCard"
import ShowCard from "./showcard"
import { Container } from "@mui/material"

interface Iprops {
    data: IModelPaginate<ITrack> | undefined
}
const ShowList = (props: Iprops) => {


    let { data } = props
    return (
        <>

            <Container sx={{ marginTop: "50px" }}>
                <Grid container spacing={5}>
                    {data && data.result.map((item) => {
                        return (

                            <Grid key={item.id} item xs={6}>

                                <ShowCard id={item.id} url={item.url} title={item.title} description={item.description} imgUrl={item.imgUrl} />
                            </Grid>
                        )


                    })}

                </Grid>
            </Container>
        </>

    )

}
export default ShowList