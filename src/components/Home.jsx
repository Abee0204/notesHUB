import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const notesId = searchParams.get("notesId");
  const pastes = useSelector((state) => state.paste.pastes);
  const selectedNote = notesId
    ? pastes.find((paste) => paste.id === notesId)
    : null;

  return (
    <NotesEditor
      key={notesId || "new-note"}
      notesId={notesId}
      selectedNote={selectedNote}
      setSearchParams={setSearchParams}
    />
  );
};

const NotesEditor = ({ notesId, selectedNote, setSearchParams }) => {
  const [title, setTitle] = useState(selectedNote?.title || "");
  const [content, setContent] = useState(selectedNote?.content || "");
  const dispatch = useDispatch();

  function createNotes() {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle && !trimmedContent) {
      return;
    }

    const note = {
      id: notesId || crypto.randomUUID(),
      title: trimmedTitle,
      content: trimmedContent,
      createdAt: new Date().toISOString(),
    };

    if (notesId) {
      dispatch(updateToPastes(note));
    } else {
      dispatch(addToPastes(note));
    }

    //cleaning parameters
    setTitle("");
    setContent("");
    setSearchParams({});
  }

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-3 flex items-center justify-between gap-3 px-1">
        <div>
          <p className="text-sm font-medium text-stone-700">
            {notesId ? "Editing" : "Draft"}
          </p>
          <p className="mt-0.5 text-xs text-stone-500">
            Stored in this browser
          </p>
        </div>
        <button
          className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:cursor-not-allowed disabled:bg-stone-300"
          onClick={createNotes}
          disabled={!title.trim() && !content.trim()}
        >
          {notesId ? "Save" : "Save note"}
        </button>
      </div>

      <div className="rounded-[18px] border border-stone-200 bg-[#fffdf8] px-5 py-5 shadow-[0_18px_45px_rgba(87,83,78,0.10)] sm:px-8 sm:py-7">
        <div className="flex flex-col gap-3">
          <input
            className="w-full border-0 bg-transparent px-0 py-2 text-3xl font-semibold leading-tight text-stone-950 outline-none placeholder:text-stone-300 sm:text-4xl"
            type="text"
            placeholder="Untitled"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <textarea
          className="mt-2 min-h-[58svh] w-full resize-none border-0 bg-transparent px-0 py-3 text-base leading-8 text-stone-800 outline-none placeholder:text-stone-400 sm:text-lg"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          rows={15}
        />
        <div className="flex items-center justify-between border-t border-stone-200 pt-3 text-xs text-stone-400">
          <span>{content.trim().split(/\s+/).filter(Boolean).length} words</span>
          <span>{new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
        </div>
      </div>
    </section>
  );
};

export default Home;
