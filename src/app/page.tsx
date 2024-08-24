import AppHeader from "@/components/header/app.header";
import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";
export default  async function HomePage() {
  const res= await fetch(`https://spotify81.p.rapidapi.com/albums?ids=3IBcauSj5M2A6lTeffJzdv`,{
      method:"GET",
     
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": "spotify81.p.rapidapi.com" ,
       "x-rapidapi-key": "4e6b452c2amshdbaead8b668b88ap19b299jsn5ffe05e01ab3"
      },
  })
  
  const data = await res.json()
  console.log(data)

  return (

  <div>
    <Container>
    <MainSlider></MainSlider>
    <MainSlider></MainSlider>
    <MainSlider></MainSlider>
    </Container>
    </div>
  );
}
