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
import { useState } from "react";

interface PostProps extends React.ComponentProps<"section"> {
  data: IPost;
}

export function Post(props: PostProps) {
  const { className, data: post, ...rest } = props;
  const cn = classNames(
    className,
    "border-solid border-t-[1px] border-gray-200 py-3"
  );

<
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [deadline, setDeadline] = useState("");

  const addInitiative = async () => {
    const token = localStorage.getItem("token");

    const formData = {
        title,
        description,
        type,
        deadline,
        postId: props.data.id
    };

    await fetch("http://localhost:3001/initiatives", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
    });
  };

  const like = () => {};
  const comment = () => {};
  const bookmark = () => {};
  
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <section className={cn} {...rest}>
      <Stack direction="row" className="px-6" align="center" justify={"space-between"}>
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

                <Stack direction="col" gapy={4} className="relative border border-red-200 rounded-xl p-3 bg-red-50">
                  <Heading level={4} className="absolute -top-1/7 right-0 font-bold text-[10px] uppercase py-1 px-3 rounded-md bg-red-500 text-red-50">
                    Le problème
                  </Heading>
                  <Text className="text-gray-800 font-medium">
                    {post.problem}
                  </Text>
                </Stack>

                <Stack direction="col" gapy={4} className="relative border border-green-200 rounded-xl p-3 bg-green-50">
                  <Heading level={4} className="absolute -top-1/7 right-0 font-bold text-[10px] uppercase py-1 px-3 rounded-md bg-green-500 text-green-50">
                    Solution trouvée
                  </Heading>
                  <Text className="text-gray-800 font-medium">
                    {post.problem}
                  </Text>
                </Stack>

                <Stack direction="col" gapy={4} className="relative border border-gray-200 rounded-xl p-3 bg-zinc-50">
                  <Heading level={4} className="absolute -top-1/7 right-0 font-bold text-[10px] uppercase py-1 px-3 rounded-md bg-zinc-500 text-zinc-50">
                    Conseil
                  </Heading>
                  <Text className="text-gray-800 font-medium">
                    {post.advice}
                  </Text>
                </Stack>


                <Stack direction="col" gapy={4} className="relative border border-gray-200 rounded-xl p-3 bg-zinc-50">
                  <Heading level={4} className="absolute -top-1/7 right-0 font-bold text-[10px] uppercase py-1 px-3 rounded-md bg-zinc-800 text-zinc-50">
                    Lesson

                <Stack
                  direction="col"
                  gapy={4}
                  className="relative border border-gray-200 rounded-xl p-3 bg-zinc-50"
                >
                  <Heading
                    level={4}
                    className=" absolute -top-1/7 right-0 font-bold text-[10px] uppercase py-1 px-3 rounded-md bg-zinc-800 text-zinc-50"
                  >
                    Leçon

                  </Heading>
                  <Text className="text-gray-800 font-medium">
                    {post.lesson}
                  </Text>
                </Stack>
              </Stack>

              <Media
                src={
                  post.imageUrl ||
                  "https://media.tenor.com/Pc_At0lvJi8AAAAd/little-girl-excited-cant-wait.gif"
                }
              />

              <Stack direction="row" gapx={4} align="center" justify={"space-between"}>
                <Stack direction="row" align="center" gapx={14} className="">
                  <Stack direction="row" align="center" justify="center">
                    <ButtonIcon size={"sm"} variant="ghost" className="flex" icon={<Heart />} />
                    <Text className="text-sm">32</Text>
                  </Stack>

                  <ButtonIcon size={"sm"} variant="secondary" className="flex" icon={<Bookmark />} />

                  <Stack direction="row" align="center" justify="center" className="w-full">
                    <ButtonIcon size={"sm"} variant="secondary" className="flex" icon={<MessageCircle />} />
                    <Text className="text-sm">Commentaires</Text>

                  <Stack direction="row" align="center" justify="center" className="bg-white px-2 rounded-md">
                    <ButtonIcon
                      size={"sm"}
                      variant="ghost"
                      className="flex"
                      icon={<Heart />}
                    ></ButtonIcon>
                    <Text className="text-sm">32</Text>
                  </Stack>

                  <Stack direction="row">
                    <ButtonIcon
                      size={"sm"}
                      variant="secondary"
                      className="flex"
                      icon={<Bookmark size={36} />}
                    ></ButtonIcon>

                  </Stack>

                  <ButtonIcon
                    size={"sm"}
                    variant="secondary"
                    className="flex"
                    icon={<MessageCircle />}
                  ></ButtonIcon>
                </Stack>

                <Button
                  label={"Créer un lead"}
                  variant="primary"
                  className="!h-8 !py-1"
                  onClick={() => setModalOpen(true)}
                />
              </Stack>
            </Stack>
          </Stack>
              </Stack>
        </div>
      </Stack>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-999">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Créer un lead</h2>
            <p className="text-gray-600">Remplissez les informations pour ajouter un lead.</p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Titre</label>
                <input type="text" className="w-full border border-gray-300 rounded-md p-2" required value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea className="w-full border border-gray-300 rounded-md p-2" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Type d'initiative</label>
                <select className="w-full border border-gray-300 rounded-md p-2" required value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="ARTICLE">Article</option>
                  <option value="TRAINING">Formation</option>
                  <option value="PROJECT">Projet</option>
                  <option value="MEETING">Réunion</option>
                  <option value="OTHER">Autre</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Date limite (optionnel)</label>
                <input type="date" className="w-full border border-gray-300 rounded-md p-2" value={deadline} onChange={(e) => setDeadline(new Date(e.target.value).toISOString())} />
              </div>
            </form>
            
            <div className="mt-4 flex justify-end gap-2">
              <Button label="Annuler" variant="secondary" onClick={() => setModalOpen(false)} />
              <Button label="Confirmer" variant="primary" onClick={() => addInitiative()} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function getMediaType(url: string): "image" | "video" | "gif" {
  const extension = url.split(".").pop()?.toLowerCase();
  if (!extension) return "image";
  const imageExtensions = ["png", "jpg", "jpeg"];
  const videoExtensions = ["mp4", "webm"];
  const gifExtensions = ["gif"];
  if (imageExtensions.includes(extension)) return "image";
  if (videoExtensions.includes(extension)) return "video";
  if (gifExtensions.includes(extension)) return "gif";

  return "image";
}

function Media(props: { src: string }) {
  const { src } = props;
  const type = getMediaType(src);
  let content;
 
  switch (type) {
    case "video":
      content = (
        <video src={src} autoPlay={true} loop className="w-full h-full" muted />
      );
      break;
    default:
      content = <img src={src} alt="" className="w-full h-full" />;
  }

  return <div className="overflow-hidden rounded-2xl">{content}</div>;
}
