"use client";

import classNames from "classnames";
import { Stack } from "@ui/layouts/Stack/Stack";
import Link from "next/link";
import { IPost } from "@/types/Post";
import { Avatar } from "@/ui/atoms/Avatar/Avatar";
import Image from "next/image";
import { Bookmark, Heart, MessageCircle } from "@icons";
import { ButtonIcon } from "@/ui/atoms/ButtonIcon/ButtonIcon";
import { Text } from "@/ui/atoms/Text/Text";
import { Heading } from "@/ui/atoms/Heading/Heading";
import { Button } from "@/ui/atoms/Button/Button";

interface PostProps extends React.ComponentProps<"section"> {
  data: IPost;
}

export function Post(props: PostProps) {
  const { className, data: post, ...rest } = props;
  const cn = classNames(
    className,
    "border-solid border-t-[1px] border-gray-200 py-3"
  );


  const like = () => {};
  const comment = () => {};
  const bookmark = () => {};


  return (
    <section className={cn} {...rest}>
      <Stack
        direction="row"
        className="px-6"
        align="center"
        justify={"space-between"}
      >
        <div className="">
          <Stack direction="row" gapx={12}>
            <Avatar />

            <Stack direction="col" gapy={8}>
              <Link href={""} className="">
                Roger Bentcha
              </Link>

              <Stack direction="col" gapy={14} className="">
                <Heading level={3} className="text-base font-semibold">
                  {post.title}
                </Heading>

                <Stack
                  direction="col"
                  gapy={4}
                  className="relative border border-red-200 rounded-xl p-3 bg-red-50"
                >
                  <Heading
                    level={4}
                    className=" absolute -top-1/7 right-0 font-bold text-[10px] uppercase py-1 px-3 rounded-md bg-red-500 text-red-50"
                  >
                    Le problème
                  </Heading>
                  <Text className="text-gray-800 font-medium">
                    {post.problem}
                  </Text>
                </Stack>

                <Stack
                  direction="col"
                  gapy={4}
                  className="relative border border-green-200 rounded-xl p-3 bg-green-50"
                >
                  <Heading
                    level={4}
                    className=" absolute -top-1/7 right-0 font-bold text-[10px] uppercase py-1 px-3 rounded-md bg-green-500 text-green-50"
                  >
                    Solution trouvée
                  </Heading>
                  <Text className="text-gray-800 font-medium">
                    {post.problem}
                  </Text>
                </Stack>

                <Stack
                  direction="col"
                  gapy={4}
                  className="relative border border-gray-200 rounded-xl p-3 bg-zinc-50"
                >
                  <Heading
                    level={4}
                    className=" absolute -top-1/7 right-0 font-bold text-[10px] uppercase py-1 px-3 rounded-md bg-zinc-500 text-zinc-50"
                  >
                    Conseil
                  </Heading>
                  <Text className="text-gray-800 font-medium">
                    {post.advice}
                  </Text>
                </Stack>

                <Stack
                  direction="col"
                  gapy={4}
                  className="relative border border-gray-200 rounded-xl p-3 bg-zinc-50"
                >
                  <Heading
                    level={4}
                    className=" absolute -top-1/7 right-0 font-bold text-[10px] uppercase py-1 px-3 rounded-md bg-zinc-800 text-zinc-50"
                  >
                    Lesson
                  </Heading>
                  <Text className="text-gray-800 font-medium">
                    {post.lesson}
                  </Text>
                </Stack>
              </Stack>

              <Media src="https://media.tenor.com/U0ruyiGIGFkAAAAd/hhgf.gif" />

              <Stack
                direction="row"
                gapx={4}
                align="center"
                justify={"space-between"}
              >
                <Stack direction="row" align="center" gapx={14} className="">
                  <Stack direction="row" align="center" justify="center">
                    <ButtonIcon
                      size={"sm"}
                      variant="ghost"
                      className="flex"
                      icon={<Heart />}
                    ></ButtonIcon>
                    <Text className="text-sm">32</Text>
                  </Stack>

                    <ButtonIcon
                      size={"sm"}
                      variant="secondary"
                      className="flex"
                      icon={<Bookmark />}
                    ></ButtonIcon>
          

                  <Stack
                    direction="row"
                    align="center"
                    justify="center"
                    className="w-full"
                  >
                    <ButtonIcon
                      size={"sm"}
                      variant="secondary"
                      className="flex"
                      icon={<MessageCircle />}
                    ></ButtonIcon>
                    <Text className="text-sm">Commentaires</Text>
                  </Stack>
                </Stack>

                <Button
                  label={"Créer un lead"}
                  variant="primary"
                  className="!h-8 !py-1"
                />
              </Stack>
            </Stack>
          </Stack>
        </div>
      </Stack>
    </section>
  );
}



function getMediaType(url: string): "image" | "video" | "gif" {
    // Extraction de l'extension du fichier
    const extension = url.split('.').pop()?.toLowerCase();

    if (!extension) return "image";

    // Définition des types de média
    const imageExtensions = ["png", "jpg", "jpeg"];
    const videoExtensions = ["mp4", "webm"];
    const gifExtensions = ["gif"];

    if (imageExtensions.includes(extension)) return "image";
    if (videoExtensions.includes(extension)) return "video";
    if (gifExtensions.includes(extension)) return "gif";

    return "image";
}



function Media(props: {src: string}) {
  const {src} = props;
  const type = getMediaType(src);
  let content;

  console.log(type);

  switch(type) {
    case "video":
      content =  <video src={src} loop className="w-full h-full" />;
    default:
      content = <img src={src} alt="" className="w-full h-full" />;
  } 

  return <div className="overflow-hidden rounded-2xl">
    {content}
  </div>
}