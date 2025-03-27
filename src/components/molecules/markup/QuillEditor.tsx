"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

type QuillEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

// Dynamically import ReactQuill to prevent hydration errors
const ReactQuillComponent = dynamic(() => import("react-quill"), {
  ssr: false,
});

export const QuillEditor = ({ value, onChange }: QuillEditorProps) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "clean", "image"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <ReactQuillComponent
      theme="snow"
      // Internal styles are declared in the global.css file
      className="w-full"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder={"Enter the recipe content here..."}
    />
  );
};
