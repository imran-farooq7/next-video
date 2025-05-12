"use client";

import Modal from "@/components/modal/modal";
import { VideoContext } from "@/context/video";
import { storyOptions, styleOptions } from "@/lib/constants";
import { useContext } from "react";

const CreateVideo = () => {
  const ctx = useContext(VideoContext);
  const {
    selectedStory,
    selectedStyle,
    customPrompt,
    handleCustomPromptChange,
    handleSelectedStoryChange,
    handleSelectedStyleChange,
    handleSubmit,
    loading,
  } = ctx!;
  return (
    <div className="container mx-auto px-4 pt-20">
      <h1 className="text-2xl font-bold mb-5">Create Your Video</h1>
      <div>
        <h2 className="text-lg font-semibold mb-4">
          Select a Story Type or Enter Custom Prompt
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {storyOptions.map((story) => {
            return (
              <div key={story.label} className="h-auto">
                {story.type === "custom" ? (
                  <>
                    <input
                      type="text"
                      className="peer block h-10 w-full rounded-md
 border px-3 py-1 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 "
                      value={customPrompt}
                      onChange={handleCustomPromptChange}
                      id={story.label}
                      placeholder="Enter custom prompt"
                    />
                    <label
                      htmlFor={story.label}
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                    >
                      {story.label}
                    </label>
                  </>
                ) : (
                  <button
                    type="button"
                    className={`rounded-sm cursor-pointer bg-indigo-600 w-full h-10 text-base font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                      selectedStory === story.label
                        ? "border-3 border-orange-500"
                        : ""
                    }`}
                    onClick={() => handleSelectedStoryChange(story.label)}
                  >
                    {story.label}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-5">Select a video style</h1>
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {styleOptions.map((style) => {
              return (
                <div key={style.name} className="h-auto">
                  <button
                    type="button"
                    className={`rounded-sm cursor-pointer bg-orange-500 w-full h-10 text-base font-semibold text-white shadow-xs hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 ${
                      selectedStyle === style.name
                        ? "border-3 border-indigo-500"
                        : ""
                    }`}
                    onClick={() => handleSelectedStyleChange(style.name)}
                  >
                    {style.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button
        type="button"
        disabled={!selectedStory || (!selectedStyle && !customPrompt)}
        onClick={handleSubmit}
        className={`rounded-sm mt-20 mb-4 w-full cursor-pointer bg-emerald-500 md:w-1/4 block mx-auto h-14 text-base font-semibold text-white shadow-xs hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 `}
      >
        {loading ? (
          <span className="animate-pulse ease-in-out">Please wait...</span>
        ) : (
          "Create Video"
        )}
      </button>
      <Modal />
    </div>
  );
};

export default CreateVideo;
