import type { Metadata } from "next";
import "../src/index.css";

export const metadata: Metadata = {
  title: "Juice Box Studios",
  description: "Dark fantasy game worlds and lore-heavy interactive adventures.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body>{children}</body></html>;
}
