"use client";

import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const [searchText, setSearchText] = useState("");

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  const filterPrompts = () => {
    const filteredPrompts = posts.filter(
      (post) =>
        post.prompt.toLowerCase().includes(searchText) ||
        post.tag.toLowerCase().includes(searchText) ||
        post.creator.username.toLowerCase().includes(searchText)
    );

    return filteredPrompts;
  };

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          className="search_input peer"
          value={searchText}
          onChange={handleSearchText}
          required
        />
      </form>

      <PromptCardList
        data={filterPrompts()}
        handleTagClick={(tag) => setSearchText(tag)}
      />
    </section>
  );
};

export default Feed;
