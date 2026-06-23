import { useNavigate } from 'react-router-dom'

const PageError = () => {
    const navigate = useNavigate();
  return (
    <main className="flex min-h-svh items-center justify-center bg-[#f7f3eb] px-4">
      <section className="w-full max-w-md rounded-[18px] border border-stone-200 bg-[#fffdf8] p-8 text-center shadow-[0_18px_45px_rgba(87,83,78,0.10)]">
        <p className="text-sm text-stone-500">404</p>
        <h1 className="mt-2 text-2xl font-semibold text-stone-950">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-6 text-stone-500">
          The address does not match an existing page in NotesHub.
        </p>
        <button className='mt-6 rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-300' onClick={()=>{
        navigate('/')
      }}>Go home</button>
      </section>
    </main>
  )
}

export default PageError
