// src/Pages/AskQuestion.jsx

import React, { useState } from "react";
import { RichTextEditor } from "@mantine/rte";
import "@mantine/core/styles.css";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("<p></p>");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", {
      title,
      description,
      tags: tags.split(",").map((t) => t.trim()),
    });
    alert("Form submitted (testing frontend only)!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-purple-700">Ask a Question</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full border rounded-md px-4 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Description</label>
            <RichTextEditor value={description} onChange={setDescription} />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              className="w-full border rounded-md px-4 py-2"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;