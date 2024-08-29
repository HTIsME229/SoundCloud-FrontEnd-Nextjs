"use client"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box } from "@mui/material";
import Button from "@mui/material/Button/Button";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import Link from "next/link";
interface IProps {
    data: ITrack[],
    title: string

}
const MainSlider = (props: IProps) => {
    const data = props.data;

    const NextArrow = (props: any) => {


        return (
            <Button color="inherit" variant="contained"
                onClick={props.onClick}
                sx={{
                    position: "absolute",
                    right: 25,
                    top: "25%",
                    zIndex: 2,
                    minWidth: 30,
                    width: 35,
                }}
            >
                <ChevronRightIcon />
            </Button>
        )
    }

    const PrevArrow = (props: any) => {
        return (
            <Button color="inherit" variant="contained" onClick={props.onClick}
                sx={{
                    position: "absolute",
                    top: "25%",
                    zIndex: 2,
                    minWidth: 30,
                    width: 35,
                }}
            >
                <ChevronLeftIcon />
            </Button>
        )
    }
    const settings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow></PrevArrow>


    };
    return (
        <Box
            sx={{
                margin: "0 50px",
                ".track": {
                    padding: "0 10px",
                    "img": {
                        width: "150px",
                        height: "150px"

                    }
                },
                "h3": {
                    border: "1px solid #ccc",
                    padding: "20px",
                    height: "200px",

                },

            }}
        >
            <h2> {props.title} </h2>

            <Slider {...settings}>
                {data && data.map((item) => {
                    return (
                        <div className="track" key={item.id}>
                            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}upload/images/${item.imgUrl}`} alt="" />
                            <Link href={`/track/${item.id}?audio=${item.url}`}>
                                <h4>{item.title}

                                </h4>
                            </Link>
                            <h5>{item.description}</h5>
                        </div>
                    )
                })
                }
            </Slider>
            <Divider />
        </Box>

    )
}
export default MainSlider