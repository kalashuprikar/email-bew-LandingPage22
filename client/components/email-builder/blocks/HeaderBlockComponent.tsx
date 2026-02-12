import React from "react";
import { HeaderBlock } from "../types";
import { Upload } from "lucide-react";

interface HeaderBlockComponentProps {
  block: HeaderBlock;
  isSelected: boolean;
  onLogoChange: (src: string) => void;
}

export const HeaderBlockComponent: React.FC<HeaderBlockComponentProps> = ({
  block,
  isSelected,
  onLogoChange,
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (warn if > 1MB)
      if (file.size > 1024 * 1024) {
        console.warn(
          "⚠️ Large image detected! File size: " +
            (file.size / 1024 / 1024).toFixed(2) +
            "MB. Consider using a smaller image to avoid storage issues.",
        );
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onLogoChange(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`transition-all ${
        isSelected ? "border-2 border-dashed border-valasys-orange" : ""
      }`}
      style={{
        backgroundColor: block.backgroundColor,
        padding: `${block.padding}px`,
      }}
    >
      {/* Header Main Row - Logo and Links */}
      <div
        className="flex items-center justify-between gap-6"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ flexShrink: 0 }}>
          {block.logo ? (
            <img
              src={block.logo}
              alt={block.logoAlt || "Logo"}
              style={{
                width: `${block.logoWidth}px`,
                height: `${block.logoHeight}px`,
                objectFit: "contain",
                display: "block",
              }}
            />
          ) : (
            <label className="flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded p-3 border-2 border-dashed border-gray-300" style={{ width: `${block.logoWidth}px`, height: `${block.logoHeight}px` }}>
              <div className="flex flex-col items-center">
                <Upload className="w-4 h-4 text-gray-400 mb-1" />
                <p className="text-xs text-gray-500">Logo Image</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Links */}
        <div style={{ flexShrink: 0, display: "flex", gap: "8px", alignItems: "center", marginLeft: "auto" }}>
          {block.links.length > 0 ? (
            block.links.map((link, index) => (
              <React.Fragment key={link.id}>
                <a
                  href={link.url}
                  style={{
                    fontSize: `${block.linksFontSize}px`,
                    color: block.linksFontColor,
                    textDecoration: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {link.text}
                </a>
                {index < block.links.length - 1 && (
                  <span style={{ color: block.linksFontColor }}>|</span>
                )}
              </React.Fragment>
            ))
          ) : (
            <span
              style={{
                fontSize: `${block.linksFontSize}px`,
                color: block.linksFontColor,
              }}
              className="text-xs"
            >
              No links
            </span>
          )}
        </div>
      </div>

      {/* Company Name - Below Logo and Links */}
      {block.companyName && (
        <div style={{ textAlign: block.alignment as any, marginTop: "12px" }}>
          <span
            style={{
              fontSize: `${block.companyFontSize}px`,
              color: block.companyFontColor,
              fontWeight: block.companyFontWeight,
              display: "block",
            }}
          >
            {block.companyName}
          </span>
        </div>
      )}
    </div>
  );
};
