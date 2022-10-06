import React, { useState, useEffect } from 'react';

import Markdown from 'markdown-to-jsx';
import { Routes, Route, useParams } from "react-router-dom";

function MarkdownContainer() {
  let { file } = useParams()

  const file_name = `${file}.md`;
  const [post, setPost] = useState('');

  useEffect(() => {
    import(`./markdown/${file_name}`)
      .then(res => {
        fetch(res.default)
          .then(res => res.text())
          .then(res => setPost(res))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });

  return (
    <div className="container">
      <Markdown>
        {post}
      </Markdown>
    </div>
  );
}

function App() {
  return (
    <Routes>
        <Route path="/md/:file" element={<MarkdownContainer />} />
      </Routes>
  )
}

export default App;