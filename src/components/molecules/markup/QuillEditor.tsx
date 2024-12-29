import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type QuillEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export const QuillEditor = ({ value, onChange }: QuillEditorProps) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "clean"],
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
  ];

  return (
    <ReactQuill
      theme="snow"
      // Internal styles are declared in the global.css file
      className="w-full border-red-500 border-2"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder={"Enter the recipe content here..."}
    />
  );
};
