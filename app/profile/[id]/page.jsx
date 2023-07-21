"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Profile from "@components/Profile";

const GeneralProfile = () => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (params?.id) {
      fetchPosts();
    }
  }, []);

  return (
    <Profile
      name={userName}
      description={`Welcome to ${userName}'s personalized profile page`}
      data={posts}
    />
  );
};

export default GeneralProfile;
