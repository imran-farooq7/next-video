import { VideoContext } from "@/context/video";
import { useContext } from "react";
import { AbsoluteFill, Img, Sequence, useVideoConfig, Audio } from "remotion";
const RemotionVideo = () => {
  const { audio, captions, images } = useContext(VideoContext)!;
  const { fps } = useVideoConfig();
  // Calculate total duration based on captions
  const totalDuration =
    captions.length > 0
      ? Math.ceil((captions[captions.length - 1] as any).end / (1000 / 30)) + 30 // Add 30 frames for an additional second
      : 1; // Default to 1 second if no captions
  return (
    <AbsoluteFill>
      {images.map((img, i) => (
        <Sequence
          key={i}
          from={(i * totalDuration) / images.length} // Start each
          durationInFrames={totalDuration}
        >
          <Img
            src={img}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              margin: "auto",
            }}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export default RemotionVideo;
