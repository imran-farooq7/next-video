import { createVideo, generateImageAi } from "@/actions/geminiai";
import { createAudio } from "@/actions/murf";
import Hero from "@/components/hero/hero";
import Navbar from "@/components/nav/nav";

const Home = async () => {
  // createAudio("hello world");
  // createVideo()
  return (
    <main className="max-w-7xl mx-auto">
      <Hero />
    </main>
  );
};

export default Home;
