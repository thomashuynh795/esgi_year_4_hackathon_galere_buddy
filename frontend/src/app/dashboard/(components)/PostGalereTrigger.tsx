"use client";

import { Button } from "@/ui/atoms/Button/Button";
import * as Drawer  from "@ui/organisms/Drawer/Drawer";
import PostGalereForm from "./PostGalereForm";
import { useRef, useState } from "react";
import { IPost, NewPost } from "@/types/Post";
import { ImagePlay, ImagePlus, Video } from "lucide-react";
import { Stack } from "@/ui/layouts/Stack/Stack";
import { ButtonIcon } from "@/ui/atoms/ButtonIcon/ButtonIcon";
import { createPost } from "@/services/fetch.service";
import { open as opentToast } from "@ui/organisms/Toast/Toast";

export function PostGalereTrigger() {
    const [formRef, setFormRef] = useState<HTMLFormElement>();
      const [isLoading, setIsLoading] = useState(false);
      const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const create = async (post: NewPost) => {
       try {
         const response = await createPost(post);

         opentToast({
          title: "Success",
          description: "Post créer avec succèss",
          style: "success"
        
         })


         setIsDrawerOpen(false);
         setIsLoading(false);
         window.location.reload();
       } catch (error) {
         console.error("Erreur lors de la création du post :", error);
                  
         opentToast({
           title: "Error",
           description: "Une erreur c'est produite lors de la création de la galère",
           style: "error",
         });
       }
    };

    return (
      <Drawer.Root title="Poster une galère" open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <Drawer.Trigger>
          <Button
            label="Poster une galère"
            variant={"rounded"}
            type={"button"}
          />
        </Drawer.Trigger>

        <PostGalereForm
          handleFormRef={setFormRef}
          handleSubmit={async (post: NewPost | IPost) => {
            setIsLoading(true);
            await create(post);
            setIsLoading(false);
            setIsDrawerOpen(false);
          }}
        />

        {/* <Drawer.Footer>
          <Stack direction="row">
            <ButtonIcon icon={<ImagePlus size={26}/>} variant="ghost" size={"lg"}/>
            <ButtonIcon icon={<ImagePlay size={26}/>} variant="ghost" size={"lg"}/>
            <ButtonIcon icon={<Video size={26}/>} variant="ghost" size={"lg"}/>
          </Stack>
        </Drawer.Footer> */}

        <Drawer.Action>
          <Button
            label="Poster"
            variant={"rounded"}
            loading={isLoading}
            type={"button"}
            onClick={() => {
              formRef?.requestSubmit();
            }}
          />
        </Drawer.Action>
      </Drawer.Root>
    );
}