import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignIn from "@/components/auth/auth.signin"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {

    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/")
    }

    return (
        <>
            <SignIn  ></SignIn>
        </>
    )
}
export default SignInPage