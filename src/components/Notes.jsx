import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const Notes = () => {
  const pastes = useSelector((state) => state.paste.pastes);

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = pastes.filter((paste) =>
    `${paste.title} ${paste.content}`.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = (pasteID) => {
    dispatch(removeFromPastes({ pasteID }));
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    toast.success("copied");
  };

  const navigateEdit = useNavigate();
  const noteCountLabel = pastes.length === 1 ? "1 note" : `${pastes.length} notes`;

  return (
    <section className="mx-auto max-w-4xl">
      <div className="mb-5 flex flex-col justify-between gap-3 px-1 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-stone-950">
            All notes
          </h1>
          <p className="mt-1 text-sm text-stone-500">{noteCountLabel} saved here</p>
        </div>
        <input
          className="min-h-10 w-full rounded-full border border-stone-300/80 bg-white/80 px-4 py-2 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 sm:max-w-xs"
          type="search"
          placeholder="Search notes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredData.length === 0 ? (
        <div className="rounded-[18px] border border-dashed border-stone-300 bg-white/60 px-6 py-12 text-center">
          <h2 className="text-lg font-medium text-stone-950">
            {pastes.length === 0 ? "Nothing saved yet" : "No results"}
          </h2>
          <p className="mt-2 text-sm text-stone-500">
            {pastes.length === 0
              ? "Write a note and save it when you are ready."
              : "Try searching for a word from the note body."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[18px] border border-stone-200 bg-[#fffdf8] shadow-[0_14px_35px_rgba(87,83,78,0.08)]">
          {filteredData.map((paste) => {
            const createdDate = paste.createdAt
              ? new Date(paste.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Unknown date";

            return (
              <article
                className="grid gap-4 border-b border-stone-200/80 p-4 transition last:border-b-0 hover:bg-amber-50/35 sm:grid-cols-[1fr_auto] sm:items-start sm:p-5"
                key={paste?.id}
              >
                <div className="min-w-0">
                  <h2 className="truncate text-base font-semibold text-stone-950">
                    {paste.title || "Untitled note"}
                  </h2>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-stone-400">
                    <span>{createdDate}</span>
                    <span className="h-1 w-1 rounded-full bg-stone-300" />
                    <span>
                      {paste.content?.trim().split(/\s+/).filter(Boolean).length || 0} words
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-2 whitespace-pre-wrap text-sm leading-6 text-stone-600">
                    {paste.content || "No content added yet."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 sm:justify-end">
                  <button
                    className="rounded-full border border-stone-300 px-3 py-1.5 text-sm text-stone-700 transition hover:bg-white"
                    onClick={() => navigateEdit(`/?notesId=${paste?.id}`)}
                  >
                    Edit
                  </button>

                  <NavLink
                    to={`/notes/${paste?.id}`}
                    className="rounded-full border border-stone-300 px-3 py-1.5 text-center text-sm text-stone-700 transition hover:bg-white"
                  >
                    View
                  </NavLink>

                  <button
                    className="rounded-full border border-stone-300 px-3 py-1.5 text-sm text-stone-700 transition hover:bg-white"
                    onClick={() => handleDelete(paste?.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="rounded-full bg-stone-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-stone-700"
                    onClick={() => handleCopy(paste?.content)}
                  >
                    Copy
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Notes;
