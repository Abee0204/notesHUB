import React, { useState } from "react";

const Home = () => {
  const [title, setTitle] = useState("");

  return (
    <div>
      <input
        className="p-2 mt-2 rounded-2xl"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
    </div>
  );
};

export default Home;
