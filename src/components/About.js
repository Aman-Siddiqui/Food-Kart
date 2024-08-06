import User from "./User"
import UserClass from "./UserClass"

const About = () => {
    return (
        <>
        <div>
            <h1>This is about us page</h1>
        </div>
        <div>
            <User name={"Akshay function"} location={"dehrdun function"}/>
            <UserClass  name={"Akshay class"} location={"dehrdun class"}/>
        </div>
        </>
    )
}

export default About