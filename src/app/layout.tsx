import "../styles/globals.css";
import { Roboto } from "next/font/google";
import Navbar from "@/components/Navbar";
import Main from "@/components/layout/Main";
import QueryWrapper from "@/components/QueryWrapper";

export const metadata = {
  title: "Recipeer",
  icons: "/icon.svg",
  description: "Create recipes. Share them. Make awesome meals.",
};

const roboto = Roboto({
  weight: ["400", "500", "700"],
  preload: false,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <QueryWrapper>
          {/* @ts-expect-error Server Component */}
          <Navbar />
          <Main>{children}</Main>
          <div id="modal"></div>
        </QueryWrapper>
      </body>
    </html>
  );
}
