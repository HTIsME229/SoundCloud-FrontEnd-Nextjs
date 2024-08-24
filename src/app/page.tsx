import AppHeader from "@/components/header/app.header";
import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";
export default async function HomePage() {

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
