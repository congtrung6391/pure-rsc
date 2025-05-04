import { ReactNode } from "react"
import NavBar from "./NavBar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <head>Example RSC</head>
      <body>
        <NavBar />
        {children}  
      </body>
    </html>
  )
};

export default Layout;
