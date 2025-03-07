"use client"
import { Heading } from "@/ui/atoms/Heading/Heading"
import React from "react"
import { Text } from "@/ui/atoms/Text/Text";
import { Button } from "@/ui/atoms/Button/Button";
import { Stack } from "@/ui/layouts/Stack/Stack";
import { Avatar } from "@/ui/atoms/Avatar/Avatar";
import Logo from "@/ui/atoms/Logo/Logo";
import { POSTS } from "@/constants/sample";
import { Post } from "@/ui/organisms/Post/Post";

export default function Dashboard() {
    const posts = POSTS;

    console.log(posts);
    return (
      <div className="w-full">
        <div className="hidden md:inline-block w-full">
          <div className="p-4">
            <Heading level={4} className={"text-base font-semibold"}>
              Feed
            </Heading>
          </div>

          <Stack
            direction="col"
            className="px-4 py-6 border-t-[1px] border-gray-200"
          >
            <Stack direction="row" align="center" gapx={8}>
              <Avatar />
              <Stack direction="col" gapx={8}>
                <Heading level={4} className="text-sm font-medium">
                  Roger Bentcha
                </Heading>
                {/* <Text>Developpeur chez</Text> */}
              </Stack>
            </Stack>

            <Stack direction="col">
              <div>
                <Text className="my-3 !text-gray-500">
                  Qu'est ce qui c'est passé Roger?
                </Text>
                <Button
                  label="Poster une galère"
                  variant={"rounded"}
                  type={"button"}
                />
              </div>
            </Stack>
          </Stack>
        </div>

        <div className="">
          {posts.map((post) => {
            return <Post data={post} key={post.id} />;
          })}
        </div>
      </div>
    );
}