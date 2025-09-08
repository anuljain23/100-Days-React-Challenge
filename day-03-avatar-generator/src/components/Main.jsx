import AsideBar from './AsideBar'
import AvatarCard from './AvatarCard'

const Main = () => {
    return (
        <main className='flex-1 flex flex-col p-6 lg:py-6 lg:px-20 gap-6 lg:flex-row'>
            {/* Categories Sidebar */}
            <AsideBar />
            {/* Main Content */}
            <AvatarCard />
        </main>
    )
}

export default Main