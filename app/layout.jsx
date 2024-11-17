import Navbar from "./components/Navbar/Navbar";
import "./globals.scss";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
