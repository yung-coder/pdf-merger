import { useRef, useState } from "react";
import "./App.css";
import Merge from "./components/Merge";

const MAX_COUNT = 2;
function App() {
  const [uploadedfiles, setuploadedfiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const selected = useRef(null);
  const upload = (files) => {
    const uploaded = [...uploadedfiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setuploadedfiles(uploaded);
  };
  const handelupload = (e) => {
    const files = Array.prototype.slice.call(e.target.files);
    upload(files);
  };
  return (
    <div className="App">
      {uploadedfiles.length == 0 ? (
        <>
          <div className="w-screen h-screen  flex flex-col justify-center items-center  space-y-32">
            <h1 className="text-white italic text-4xl md:text-7xl font-medium">
              PDF-MERGER
            </h1>
            <div className="flex w-full justify-center items-center text-white">
              <p className="text-justify tracking-wide text-lg md:text-2xl italic font-bold">
                Select two .pdf type files
              </p>
            </div>
            <div className="flex flex-col justify-center items-center text-white">
              <input
                type="file"
                ref={selected}
                hidden
                onChange={handelupload}
                multiple
              />
              <button
                onClick={() => selected.current.click()}
                className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 md:px-9 md:py-4 md:text-lg"
              >
                Upload
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <Merge files={uploadedfiles} />
        </>
      )}
    </div>
  );
}

export default App;
