"use client";

import React, { useState } from "react";
import { TextInput, Button, Badge } from "flowbite-react";

interface InputTagsProps {
  value: string[];
  onChange: (tags: string[]) => void;
  color?: string;
}

export const InputTags = ({ value, onChange, color }: InputTagsProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim())) {
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <TextInput
          className="w-max"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a tag"
          color={color}
        />
        <Button onClick={handleAddTag}>Add Tag</Button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {value.map((tag, index) => (
          <Badge
            key={index}
            color="info"
            className="max-w-fit cursor-pointer"
            size="sm"
            onClick={() => handleRemoveTag(tag)}
          >
            {tag} &times;
          </Badge>
        ))}
      </div>
    </>
  );
};
