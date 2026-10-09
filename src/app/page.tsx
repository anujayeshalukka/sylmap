import { cookies } from "next/headers";
import SimpleHomePage from "@/components/home-experimental/SimpleHomePage";
import AcademicUniversePreloader from "@/components/home-experimental/AcademicUniversePreloader";
import { PRELOADER_COOKIE } from "@/components/home-experimental/preloaderSession";

/**
 * EXPERIMENTAL homepage (pending client approval): Academic Universe preloader + simplified homepage.
 * The approved homepage is preserved unchanged at /home-original.
 * Review aid: /?intro=replay plays the intro again regardless of the session cookie.
 */
export default async function Home({ searchParams }: { searchParams: Promise<{ intro?: string }> }) {
  // The server decides whether to render the intro, so returning visitors in the same
  // browser session never see it flash, and first-time visitors never see the page flash first.
  const [cookieStore, params] = await Promise.all([cookies(), searchParams]);
  const showIntro = params.intro === "replay" || !cookieStore.has(PRELOADER_COOKIE);

  return (
    <>
      <SimpleHomePage />
      <AcademicUniversePreloader initiallyVisible={showIntro} />
    </>
  );
}
