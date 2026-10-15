import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { videoSources } from "@/data/site";
import { Clients } from "./Clients";
import { Contact } from "./Contact";
import { Footer } from "@/components/Footer";

export function FooterVideoScene() {
  return (
    <div className="footer__video-container relative isolate">
      {/* <div className="footer__video-wrapper absolute left-[-1%] top-[-1vh] -z-[1] flex h-[102vh] w-[102%] after:absolute after:inset-0 after:z-[2] after:bg-black/30">
        <BackgroundVideo src={videoSources.footer} />
      </div>
      <Clients /> */}
      <Contact />
      <Footer />
    </div>
  );
}
