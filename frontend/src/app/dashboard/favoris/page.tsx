"use client";
import { Heading } from "@/ui/atoms/Heading/Heading";
import React from "react";
import { Text } from "@/ui/atoms/Text/Text";
import { Button } from "@/ui/atoms/Button/Button";
import { Stack } from "@/ui/layouts/Stack/Stack";
import { Avatar } from "@/ui/atoms/Avatar/Avatar";
import Logo from "@/ui/atoms/Logo/Logo";
import { POSTS } from "@/constants/sample";
import { Post } from "@/ui/organisms/Post/Post";
import { PostGalereTrigger } from "../(components)/PostGalereTrigger";
import { useFetch } from "@/hooks/useFetch";
import { getAllPost } from "@/services/fetch.service";
import { getLikedPost } from "@/services/fetch.service";
import { LoadinSpinner } from "@/ui/molecules/LoadingSpinner/LoadingSpinner";

export default function Favoris() {
  const { isLoading, data: posts } = useFetch("book", getAllPost);
  const { data: likedPosts } = useFetch("bookmarks", getLikedPost);

  if (isLoading) {
    return <LoadinSpinner />;
  }

  if (!posts || !likedPosts) {
    return <p>Aucun favori trouvé.</p>;
  }

  const filteredPosts = posts.filter((post) =>
    likedPosts.some((liked) => liked.id === post.id)
  );
 

  return (
    <div className="w-full">
      <div className="hidden md:flex w-full flex-col">
        <div className="p-4">
          <Heading level={4} className="text-base font-semibold">
            Favoris
          </Heading>
        </div>
      </div>

      <div className="">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <Post data={post} key={post.id} />)
        ) : (
          <p>Aucun post en favori.</p>
        )}
      </div>
    </div>
  );
}
