import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";

/**
 * The approved Sylmap homepage, kept unchanged for side-by-side review while the
 * experimental homepage at "/" is evaluated. Renders the original HomePage component.
 */
export const metadata: Metadata = {
  title: "Sylmap — Original Homepage",
  robots: { index: false, follow: false },
};

export default function HomeOriginal() {
  return <HomePage />;
}
