import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewNotes = () => {
  const { id } = useParams();

  const pastes = useSelector((state) => state.paste.pastes);

  const note = pastes.find((paste) => paste.id === id);

  if (!note) {
    return (
      <div className="mx-auto max-w-2xl rounded-[18px] border border-dashed border-stone-300 bg-white/60 px-6 py-12 text-center">
        <h1 className="text-xl font-semibold text-stone-950">Note not found</h1>
        <p className="mt-2 text-sm text-stone-500">
          It may have been deleted, or the link may be old.
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-3xl">
      <article className="rounded-[18px] border border-stone-200 bg-[#fffdf8] px-5 py-6 shadow-[0_18px_45px_rgba(87,83,78,0.10)] sm:px-8 sm:py-8">
        <h1 className="text-3xl font-semibold leading-tight text-stone-950 sm:text-4xl">
          {note.title || "Untitled note"}
        </h1>

        <div className="mt-3 flex flex-wrap gap-2 text-sm text-stone-500">
          <span>{new Date(note.createdAt).toLocaleString()}</span>
          <span className="text-stone-300">/</span>
          <span>{note.content?.trim().split(/\s+/).filter(Boolean).length || 0} words</span>
        </div>

        <div className="mt-8 whitespace-pre-wrap border-t border-stone-200 pt-6 text-left text-base leading-8 text-stone-800 sm:text-lg">
          {note.content || "No content added yet."}
        </div>
      </article>
    </section>
  );
};

export default ViewNotes;
