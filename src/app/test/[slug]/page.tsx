export async function generateStaticParams() {
    return [
        { slug: "1" },
        { slug: "2" },
        { slug: "3" }
    ]
}
const TestSlug = ({ params }: any) => {
    const { slug } = params
    return (
        <>
            <div>test slug : {slug}</div>
        </>
    )
}
export default TestSlug