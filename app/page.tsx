"use client";

import { useState } from "react";
import Slide from "@/components/Slide";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const generateSlides = async () => {
    if (!idea.trim()) {
      alert("Please enter an idea");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
      } else {
        setSlides(data.slides);
      }
    } catch (error) {
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Social Media Studio</h1>

      {/* Input Box */}
      <textarea
        className="w-full max-w-xl border p-3 rounded-lg"
        placeholder="Enter your idea (e.g., Why kids forget what they learn)"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />

      {/* Generate Button */}
      <button
        onClick={generateSlides}
        className="bg-blue-500 text-white px-6 py-2 rounded mt-3 hover:bg-blue-600"
      >
        Generate
      </button>

      {/* Loading */}
      {loading && <p className="mt-3">Generating...</p>}

      {/* Slides */}
      <div className="flex gap-4 mt-6 overflow-x-auto w-full justify-start px-4">
        {slides.map((slide, i) => (
          <Slide
            key={i}
            slide={slide}
            onChange={(field: string, value: string) => {
              const newSlides = [...slides];
              newSlides[i][field] = value;
              setSlides(newSlides);
            }}
          />
        ))}
      </div>
    </div>
  );
}