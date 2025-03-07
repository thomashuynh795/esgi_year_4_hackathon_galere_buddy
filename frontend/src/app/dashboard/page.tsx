"use client";

import { Heading } from "@/ui/atoms/Heading/Heading"
import React from "react"
import { Text } from "@/ui/atoms/Text/Text";
import { Button } from "@/ui/atoms/Button/Button";
import { Stack } from "@/ui/layouts/Stack/Stack";
import { Avatar } from "@/ui/atoms/Avatar/Avatar";
import Logo from "@/ui/atoms/Logo/Logo";
import { POSTS } from "@/constants/sample";
import { Post } from "@/ui/organisms/Post/Post";
import { PostGalereTrigger } from "./(components)/PostGalereTrigger";
import { useFetch } from "@/hooks/useFetch";
import { getAllPost } from "@/services/fetch.service";
import { LoadinSpinner } from "@/ui/molecules/LoadingSpinner/LoadingSpinner";

export default function Dashboard() {
    const {isLoading, data:posts} = useFetch("posts", getAllPost);

    if(isLoading) {
      return <LoadinSpinner/>
    }

    return (
      <div className="w-full">
        <div className="hidden md:flex w-full flex-col">
          <div className="p-4">
            <Heading level={4} className={"text-base font-semibold"}>
              Feed
            </Heading>
          </div>

          <Stack
            direction="row"
            className="px-4 py-6 border-t-[1px] border-gray-200"
            align={"start"} justify={"space-between"}
          >
            <Stack direction="row" align="start" gapx={8}>
              <Avatar />
              <Stack direction="col" gapx={8}>
                <Heading level={4} className="text-sm font-medium">
                  Roger Bentcha
                </Heading>
                <Text className="!text-gray-500">
                  Qu'est ce qui c'est passé Roger?
                </Text>
              </Stack>
            </Stack>


            <PostGalereTrigger/>
          </Stack>
        </div>

        <div className="">
          {posts && posts.map((post) => {
            return <Post data={post} key={post.id} />;
          })}
        </div>
      </div>
    );
}

