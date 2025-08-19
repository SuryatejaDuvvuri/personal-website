import localFont from "next/font/local";
import "./globals.css";

const matrixtype = localFont({
  src: "Matrixtype.ttf",
  variable: "--font-matrix",
  weight: "400",
});

export const metadata = {
  title: "Surya's Portfolio Website",
  description: "Surya's updated version of his portfolio website. #ucr",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${matrixtype.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
