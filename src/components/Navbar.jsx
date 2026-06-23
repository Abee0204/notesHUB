import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    [
      'rounded-full px-3 py-1.5 text-sm transition',
      isActive
        ? 'bg-white text-stone-950 shadow-[0_1px_0_rgba(120,113,108,0.18)]'
        : 'text-stone-500 hover:bg-white/60 hover:text-stone-900',
    ].join(' ');

  return (
    <header className="sticky top-0 z-20 border-b border-stone-300/50 bg-[#f7f3eb]/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 text-base font-semibold text-stone-950">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          notesHub
        </NavLink>
        <div className="flex items-center gap-1 rounded-full border border-stone-300/70 bg-stone-100/60 p-1">
          <NavLink to="/" className={linkClass}>
            Write
          </NavLink>
          <NavLink to="/notes" className={linkClass}>
            Notes
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
