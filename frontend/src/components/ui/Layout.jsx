import ResponsiveAppBar from "./NavBar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
import ChatBot from "../chatBot/ChatBot"


function Layout() {
    return (
        <div>
        <ResponsiveAppBar/>

        <main>
            <Outlet/>
        </main>

        <Footer/>
        <ChatBot/>
        </div>
    )
}

export default Layout
