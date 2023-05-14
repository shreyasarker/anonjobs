import { useEffect, useRef, useState } from "react";
import formData from "../../data/formData";

function Editor({ onChange, name, placeholder, value, editorLoaded }) {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const data = value === null ? "" : value;

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);

  return (
    <>
      {editorLoaded ? (
        <CKEditor
          name={name}
          placeholder={placeholder}
          editor={ClassicEditor}
          data={data}
          onReady={(editor) => {
            editor.editing.view.change((writer) => {
              writer.setStyle(
                "height",
                "200px",
                editor.editing.view.document.getRoot()
              );
            });
          }}
          config={{
            toolbar: formData.ckeditor,
            placeholder: placeholder,
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </>
  );
}

export default Editor;
