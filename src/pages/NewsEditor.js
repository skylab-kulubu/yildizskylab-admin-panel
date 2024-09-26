import React, { useState, useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.core.css"; // Import Quill core styles
import "quill/dist/quill.snow.css"; // Import Quill Snow theme CSS
import { createNews, uploadImage, uploadPdf } from "../services/newsService";
import ImageResize from "quill-image-resize-module-react";

const NewsEditor = () => {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // Initialize Quill editor
  useEffect(() => {
    const initializeQuill = async () => {
      window.Quill = Quill;
      // Register the modules dynamically
      Quill.register("modules/imageResize", ImageResize);

      // Initialize Quill with the dynamically imported modules
      if (editorRef.current && !quillRef.current) {
        quillRef.current = new Quill(editorRef.current, {
          theme: "snow",
          modules: {
            toolbar: {
              container: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline"],
                ["link", "blockquote", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["image", "pdf"], // Add 'pdf' button for later
              ],
              handlers: {
                image: imageHandler,
                pdf: pdfHandler,
              },
            },
            imageResize: {}, // Enable the image resize module
          },
        });
      }
    };

    initializeQuill();
    window.Quill = Quill;
  }, []);

  // Image upload handler
  function imageHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    const quillEditor = this.quill;

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        try {
          const imageUrl = await uploadImage(file);
          const range = quillEditor.getSelection();

          if (range) {
            quillEditor.insertEmbed(range.index, "image", imageUrl);
            quillEditor.setSelection(range.index + 1); // Move cursor after the image
          } else {
            quillEditor.insertEmbed(quillEditor.getLength(), "image", imageUrl);
            quillEditor.setSelection(quillEditor.getLength() + 1); // Move cursor after the image
          }
        } catch (error) {
          console.error("Image upload error:", error);
        }
      }
    };
  }

  // PDF upload handler
  function pdfHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "application/pdf");
    input.click();

    const quillEditor = this.quill;

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        try {
          const pdfUrl = await uploadPdf(file);
          const range = quillEditor.getSelection();

          const linkText = file.name;

          if (range) {
            quillEditor.insertText(range.index, linkText, { link: pdfUrl });
            quillEditor.setSelection(range.index + linkText.length); // Move cursor after the link
          } else {
            quillEditor.insertText(quillEditor.getLength(), linkText, {
              link: pdfUrl,
            });
            quillEditor.setSelection(quillEditor.getLength() + linkText.length); // Move cursor after the link
          }
        } catch (error) {
          console.error("PDF upload error:", error);
        }
      }
    };
  }

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const quillEditor = quillRef.current;
    const content = quillEditor.root.innerHTML;

    // Create a FormData object
    const formData = new FormData();
    formData.append("Title", title);
    formData.append("Description", content);
    if (coverImage) {
      formData.append("cover_image", coverImage);
    }

    try {
      await createNews(formData);
      alert("News created successfully!");
      // Reset form
      setTitle("");
      setCoverImage(null);
      quillEditor.setContents([]); // Clear the Quill editor
    } catch (error) {
      console.error("Error creating news:", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Create News</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <div>
          <label className="block mb-1">Cover Image:</label>
          <input
            type="file"
            onChange={(e) => setCoverImage(e.target.files[0])}
            accept="image/*"
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Editor Container */}
        <div ref={editorRef} className="bg-white h-64"></div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewsEditor;