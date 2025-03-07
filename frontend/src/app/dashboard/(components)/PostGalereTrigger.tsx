import { Button } from "@/ui/atoms/Button/Button";
import * as Drawer  from "@ui/organisms/Drawer/Drawer";
import PostGalereForm from "./PostGalereForm";
import { useRef, useState } from "react";
import { IPost, NewPost } from "@/types/Post";
import { ImagePlay, ImagePlus, Video } from "lucide-react";
import { Stack } from "@/ui/layouts/Stack/Stack";
import { ButtonIcon } from "@/ui/atoms/ButtonIcon/ButtonIcon";

export function PostGalereTrigger() {
    const [formRef, setFormRef] = useState();
      const [isLoading, setIsLoading] = useState(false);
      const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const createPost = (post: NewPost) => {};

    return (
      <Drawer.Root title="Poster une galère">
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
            createPost(post);
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
          <Button label="Poster" variant={"rounded"} type={"button"} />
        </Drawer.Action>
      </Drawer.Root>
    );
}