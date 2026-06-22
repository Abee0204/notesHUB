import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { addToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const notesId = searchParams.get("notesId");

  const dispatch = useDispatch();

  function createNotes() {
    const note = {
      id: notesId || crypto.randomUUID(),
      title: title,
      content: content,
      createdAt: new Date().toISOString(),
    };

    if(notesId)
    {
      dispatch(updateToPastes(note))
    }
    else
    {
      dispatch(addToPastes(note))
    }

    //cleaning parameters
    setTitle("");
    setContent("");
    setSearchParams({});
  }

  return (
    <>
      <div className="flex flex-row gap-7 place-content-between justify-around">
        <input
          className="p-2 mt-2 rounded-2xl pl-4 w-[30%]"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button
          className="p-2 mt-2 mr-40 rounded-2xl bg-cyan-400"
          onClick={createNotes}
        >
          {notesId ? "Update Note Title" : "Create new Note"}
        </button>
      </div>

      <div>
        <textarea
          className="p-2 mt-5 rounded-2xl w-[70%] "
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter content here...."
          rows={15}
        />
      </div>
    </>
  );
};

export default Home;
