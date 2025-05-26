"use client";

import { useState } from "react";

const Credits = () => {
  const [total, setTotal] = useState(0);
  return (
    <div className="bg-white rounded-2xl px-8 py-2 text-emerald-500 font-semibold">
      Credits:{total}
    </div>
  );
};

export default Credits;
