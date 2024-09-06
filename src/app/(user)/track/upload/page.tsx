
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Box, Container } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UploadTab from "@/components/track/upload.tap";

const UploadPage = () => {


    return (
        <Container sx={{ mt: "50px" }} >
            <UploadTab  ></UploadTab>
        </Container>

    )
}
export default UploadPage