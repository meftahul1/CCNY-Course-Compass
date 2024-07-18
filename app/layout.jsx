// import { Navbar } from "./components/Navbar";
import '../styles/globals.css'
import Nav from '../components/Nav'
import Provider from '../components/Provider'

export const metadata = {
  title: "Course Compass",
  description: "Discover courses at CCNY",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        {/* <Provider> */}
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Nav/>
          {children}
        </main>
        {/* </Provider> */}
      </body>
    </html>
  );
}
