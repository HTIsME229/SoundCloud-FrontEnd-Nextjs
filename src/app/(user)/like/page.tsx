import type { Metadata } from 'next'

// either Static metadata
export const metadata: Metadata = {
    title: 'LIke Page title',
    description: "mo ta like page"
}

const LikePage = () => {
    return (
        <div>like page</div>
    )
}
export default LikePage;