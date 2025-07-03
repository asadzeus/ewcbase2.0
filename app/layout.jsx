import SessionProvider from "./provider"; 
import { Toaster } from 'react-hot-toast'; 
import Navbar from "./components/Navbar";
import "./global.css";


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body ><SessionProvider> 

        <Navbar/>
        <Toaster position="top-center" /> 
 {children}
      
</SessionProvider></body>
    </html>
  );
}
