import React from "react";
import { LogoBlock } from "../types";

interface LogoBlockComponentProps {
  block: LogoBlock;
  isSelected: boolean;
  onSrcChange: (src: string) => void;
}

export const LogoBlockComponent: React.FC<LogoBlockComponentProps> = ({
  block,
  isSelected,
  onSrcChange,
}) => {
  const isInlineDisplay = (block as any).displayMode === "inline";

  return (
    <div
      className={`relative transition-all ${
        isSelected ? "ring-2 ring-valasys-orange" : ""
      }`}
      style={{
        padding: `${(block as any).padding || 16}px`,
        display: isInlineDisplay ? "inline-block" : "block",
        width: "auto",
        verticalAlign: "middle",
      }}
    >
      {block.src ? (
        <img
          src={block.src}
          alt={block.alt}
          style={{
            width: `${block.width}px`,
            height: `${block.height}px`,
            display: "block",
          }}
        />
      ) : (
        <div
          style={{
            width: `${block.width}px`,
            height: `${block.height}px`,
            backgroundColor: "#f0f0f0",
            border: "2px dashed #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#999",
            borderRadius: "4px",
          }}
        >
          <span className="text-sm">Logo Image</span>
        </div>
      )}
    </div>
  );
};
