import { VideoContext } from "@/context/video";
import { useContext } from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  useVideoConfig,
  Audio,
  useCurrentFrame,
  interpolate,
} from "remotion";
const RemotionVideo = () => {
  const { audio, captions, images } = useContext(VideoContext)!;
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  // Calculate total duration based on captions
  const totalDuration =
    captions.length > 0
      ? Math.ceil((captions[captions.length - 1] as any).end / (1000 / 30)) + 30 // Add 30 frames for an additional second
      : 1; // Default to 1 second if no captions
  const currentCaption = () => {
    const currentTime = (frame / fps) * 1000;
    const currentCaption = captions.find(
      (caption: any) =>
        currentTime >= caption.start && currentTime <= caption.end
    );
    return currentCaption ? (currentCaption as any).text : "";
  };
  return (
    <AbsoluteFill>
      {images.map((img, i) => {
        const startFrame = (i * totalDuration) / images.length;
        const endFrame = startFrame + totalDuration;
        const opacity =
          i === 0
            ? 1
            : interpolate(
                frame,
                [startFrame, startFrame + 50, endFrame - 50, endFrame],
                [0, 1, 1, 0]
              );
        return (
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
                opacity,
              }}
            />
            <AbsoluteFill
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <h2 className="text-white text-center text-4xl">
                {currentCaption()}
              </h2>
            </AbsoluteFill>
          </Sequence>
        );
      })}
      <Audio src={audio} />
    </AbsoluteFill>
  );
};

export default RemotionVideo;
