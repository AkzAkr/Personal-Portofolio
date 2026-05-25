import "./globals.css";
import BootLoader from "./components/BootLoader";

export const metadata = {
  title: "The Experimental Lab | Anang Ismail - Informatics Engineering Student",
  description:
    "Portfolio of Anang Ismail - Informatics Engineering student specializing in front-end development, game development, IoT systems, and digital experiments. Seeking internship opportunities.",
  authors: [{ name: "Anang Ismail" }],
  keywords: [
    "portfolio",
    "web developer",
    "informatics engineering",
    "front-end",
    "game developer",
    "roblox",
    "data science",
    "internship",
  ],
  alternates: {
    canonical: "https://anangismail.dev",
  },
  openGraph: {
    title: "The Experimental Lab | Anang Ismail Portfolio",
    description:
      "Informatics Engineering student portfolio - Front-end development, Game Dev (Roblox), and Data Science.",
    type: "website",
    url: "https://anangismail.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Experimental Lab | Anang Ismail",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0058be",
};

export default function RootLayout({ children }) {
  return (
    <html className="light" lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem("theme") || "light";
                document.documentElement.classList.remove("light", "dark");
                document.documentElement.classList.add(theme);
              } catch (error) {}
            `,
          }}
        />
      </head>
      <body className="text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden">
        <BootLoader />
        {children}
      </body>
    </html>
  );
}
