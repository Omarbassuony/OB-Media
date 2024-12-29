// "use client"
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
// import { ThemeProvider } from "@emotion/react";
// import theme from "@/theme";
// import Navbar from "./_component/navbar/page";
// import {Provider} from "react-redux";
// import { store } from "@/lib/store";


// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <Provider store={store}>

      
//       <body >
//         <AppRouterCacheProvider>
//           <ThemeProvider theme={theme}>
//             <Navbar />
//             {children}
//           </ThemeProvider>
//         </AppRouterCacheProvider>
//       </body>
//       </Provider>
//     </html>
//   );
// }
"use client";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./_component/navbar/page";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";
import { StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import MenuContextProvider from "./_context/MenuContext/MenuContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>OB Media</title>
        <link rel="icon" href="/logo.png" />
      </head>
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <MenuContextProvider>
                <Navbar />
                <div className="pt-20">{children}</div>
                <Toaster />
              </MenuContextProvider>
            </Provider>
          </ThemeProvider>
        </StyledEngineProvider>
      </body>
    </html>
  );
}
