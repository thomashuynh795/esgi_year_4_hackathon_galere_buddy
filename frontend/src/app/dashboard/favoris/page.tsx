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
import { LoadinSpinner } from "@/ui/molecules/LoadingSpinner/LoadingSpinner";

export default function Favoris() {
  const { isLoading, data: posts } = useFetch("book", getAllPost);

  if (isLoading) {
    return <LoadinSpinner />;
  }

  return (
    <div className="w-full">
      <div className="hidden md:flex w-full flex-col">
        <div className="p-4">
          <Heading level={4} className={"text-base font-semibold"}>
            Favoris
          </Heading>
        </div>
 
      </div>

      <div className="">
        {posts &&
          posts.map((post) => {
            return <Post data={post} key={post.id} />;
          })}
      </div>
    </div>
  );
}
