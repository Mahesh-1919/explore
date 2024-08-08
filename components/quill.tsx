"use client";

import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

type Props = {
  content: string;
  setContent: (content: string) => void;
};

export default function Home({ content, setContent }: Props) {
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  return (
    <QuillEditor
      theme="bubble"
      value={content}
      onChange={(value) => setContent(value)}
      modules={quillModules}
      formats={quillFormats}
      className=" border border-gray-200 rounded-lg h-full p-0 text-wrap "
    />
  );
}
