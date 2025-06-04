import { Player } from "@remotion/player";
import RemotionVideo from "./remotion-video";
import { useContext } from "react";
import { VideoContext } from "@/context/video";
const RemotionPlayer = () => {
  const { audio, captions, images } = useContext(VideoContext)!;

  // Calculate total duration based on captions
  const totalDuration =
    captions.length > 0
      ? Math.ceil((captions[captions.length - 1] as any).end / (1000 / 30)) + 30 // Add 30 frames for an additional second
      : 1; // Default to 1 second if no captions

  return (
    <Player
      component={RemotionVideo}
      durationInFrames={totalDuration}
      fps={30}
      inputProps={{ images, audio, captions }}
      compositionWidth={350}
      compositionHeight={400}
      controls
    />
  );
};

export default RemotionPlayer;
