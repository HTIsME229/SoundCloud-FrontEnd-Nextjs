import AppHeader from "@/components/header/app.header";
import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";

import { url } from "inspector";
import { METHODS } from "http";

import { Console } from "console";
import { getServerSession } from "next-auth/next"

import { stringify } from "querystring";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { sendRequest } from "../utils/api";

export default async function HomePage() {
  // const session = await getServerSession(authOptions);
  // console.log("check", session)
  const Chill = await sendRequest<IBackendRes<IModelPaginate<ITrack>>>(
    {

      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tracks`,
      method: "get",
      queryParams: {
        "page": 0,
        "size": 10,
        "category": "CHILL"
      },
      nextOption: {
        next: { tags: ['uploadTrack',] }

      }


    }
  )


  const Rap = await sendRequest<IBackendRes<IModelPaginate<ITrack>>>(
    {
      queryParams: {
        "page": 0,
        "size": 10,
        "category": "Rap"
      },
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tracks`,
      method: "get",

      nextOption: {
        next: { tags: ['uploadTrack',] }

      }

    }
  )

  const Workout = await sendRequest<IBackendRes<IModelPaginate<ITrack>>>(
    {
      queryParams: {
        "page": 0,
        "size": 10,
        "category": "Workout"
      },
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tracks`,
      method: "get",
      nextOption: {
        next: { tags: ['uploadTrack',] }

      }


    }
  )



  return (

    <div>
      <Container>
        <MainSlider title="CHILL"
          data={Chill?.data?.result ?? []} ></MainSlider>
        <MainSlider title="RAP"
          data={Rap?.data?.result ?? []}></MainSlider>
        <MainSlider
          title="WORKOUT"
          data={Workout?.data?.result ?? []}></MainSlider>
      </Container>
    </div >
  );
}
