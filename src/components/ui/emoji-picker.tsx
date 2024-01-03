import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "next-themes";
import React, { type FC } from "react";

export type Emoji = {
  id: string;
  keywords: string[];
  name: string;
  native: string;
  shortcodes: string;
  unified: string;
};

type EmojiPickerProps = {
  onClickHandler: (emoji: Emoji) => void;
};

const EmojiPicker: FC<EmojiPickerProps> = ({ onClickHandler, ...props }) => {
  const { resolvedTheme } = useTheme();

  return (
    <Picker
      {...props}
      data={data}
      onEmojiSelect={onClickHandler}
      theme={resolvedTheme}
      emojiButtonSize={30}
      emojiSize={20}
      previewPosition="none"
      className=""
      style={{
        "--rgb-background": "12, 10, 9",
        border: "1px solid hsl(12 6.5% 15.1%)",
        "--rgb-accent": "16 185 129",
        "--color-border": "hsl(2 6.5% 15.1%)",
      }}
    />
  );
};

export default EmojiPicker;
