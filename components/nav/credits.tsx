"use client";

import { VideoContext } from "@/context/video";
import { useContext, useState } from "react";

const Credits = () => {
  const ctx = useContext(VideoContext);
  const { credits } = ctx!;
  const [total, setTotal] = useState(credits);
  return (
    <div className="bg-white rounded-2xl px-8 py-2 text-emerald-500 font-semibold">
      Credits:{credits}
    </div>
  );
};

export default Credits;
