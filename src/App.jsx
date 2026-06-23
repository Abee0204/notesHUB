import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Notes from './components/Notes';
import ViewNotes from './components/ViewNotes';
import { Toaster } from 'react-hot-toast';
import PageError from './error/PageError';

const AppShell = ({ children }) => (
  <div className="min-h-svh bg-[#f7f3eb] text-stone-900">
    <Navbar />
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {children}
    </main>
  </div>
);

const router = createBrowserRouter(
  [
    {
      path :"/",
      element: 
      <AppShell>
        <Home />
      </AppShell>
    },
    {
      path:"/notes",
      element:
      <AppShell>
        <Notes/>
      </AppShell>
    },
    {
      path:"/notes/:id",
      element: 
      <AppShell>
        <ViewNotes/>
      </AppShell>
    },
    {
      path:"*",
      element:
      <PageError/>
    }
  ]
);

export default function App() {
  return (
    <>
    <RouterProvider router={router}/>
    <Toaster
      position="top-right"
      toastOptions={{
        className: 'text-sm',
        duration: 2200,
      }}
    />
    </>
  )
}
