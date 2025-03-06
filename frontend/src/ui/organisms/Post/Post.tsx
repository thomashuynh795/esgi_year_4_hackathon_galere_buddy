"use client";

import classNames from "classnames";
import { Stack } from "@ui/layouts/Stack/Stack";
import Link from "next/link";
import { IPost } from "@/types/Post";
import { Avatar } from "@/ui/atoms/Avatar/Avatar";
import Image from "next/image";

interface PostProps extends React.ComponentProps<"section"> {
  data: IPost;
}

export function Post(props: PostProps) {
  const { className, data: post, ...rest } = props;
  const cn = classNames(
    className,
    "fixed bottom-0 left-0 right-0 z-50 border-solid border-t-[1px] border-gray-200"
  );

  return (
    <section className={cn} {...rest}>
      <Stack
        direction="row"
        className="px-6"
        align="center"
        justify={"space-between"}
      >
        <div className="">
          <Stack direction="row">
            <Avatar />

            <Stack direction="col">
              <Link href={""} className="">
                Roger Bentcha
              </Link>
              <div className=""></div>
              <img
                src={
                  "https://pbs.twimg.com/media/GlSRIUEWIAA8UqV?format=jpg&name=small"
                }
                alt="meme"
                className="w-full"
              />
            </Stack>
          </Stack>
        </div>
      </Stack>
    </section>
  );
}
