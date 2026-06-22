import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Notes from './components/Notes';
import ViewNotes from './components/ViewNotes';
import { Toaster, useToaster } from 'react-hot-toast';

const router = createBrowserRouter(
  [
    {
      path :"/",
      element: 
      <div>
        <Navbar/>
        <Home />
      </div>
    },
    {
      path:"/notes",
      element:
      <div>
        <Navbar/>
        <Notes/>
      </div>
    },
    {
      path:"/notes/:id",
      element: 
      <div>
        <Navbar/>
        <ViewNotes/>
      </div>
    }
  ]
);

export default function App() {
  return (
    <>
    <RouterProvider router={router}/>
    <Toaster/>
    </>
  )
}
