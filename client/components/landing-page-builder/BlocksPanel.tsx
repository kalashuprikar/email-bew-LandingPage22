import React, { useState } from "react";
import { useDrag } from "react-dnd";
import {
  Type,
  Image,
  Grid2x2,
  MessageSquare,
  FileText,
  Phone,
  Layers,
  ChevronDown,
  Layout,
  Settings,
  Zap,
  Mail,
  Users,
  TrendingUp,
  HelpCircle,
  Menu,
  Share2,
  GripHorizontal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  createHeaderBlock,
  createHeroBlock,
  createFeaturesBlock,
  createTestimonialsBlock,
  createAboutBlock,
  createContactFormBlock,
  createFooterBlock,
  createSectionSpacerBlock,
  createPricingBlock,
  createFaqBlock,
  createSignupBlock,
  createPricingFooterBlock,
  createHeadingBlock,
  createParagraphBlock,
  createRichTextBlock,
  createQuoteBlock,
} from "./utils";
import { LandingPageBlock } from "./types";

interface BlocksPanelProps {
  onAddBlock: (block: LandingPageBlock) => void;
}

interface BlockOption {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  onCreate: () => LandingPageBlock;
}

interface Section {
  id: string;
  title: string;
  blocks: BlockOption[];
}

const DraggableBlockButton: React.FC<{
  block: BlockOption;
  onAddBlock: (block: LandingPageBlock) => void;
}> = ({ block, onAddBlock }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "panel-block",
    item: () => ({
      blockType: block.id,
      blockData: block.onCreate(),
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const ref = React.useRef<HTMLButtonElement>(null);
  drag(ref);

  return (
    <button
      ref={ref}
      onClick={() => onAddBlock(block.onCreate())}
      className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all cursor-move ${
        isDragging
          ? "opacity-50 border-valasys-orange bg-orange-100 scale-95"
          : "border-gray-200 hover:border-valasys-orange hover:bg-orange-50 hover:shadow-md"
      }`}
    >
      <div className="mb-2 text-valasys-orange relative pt-3">
        {block.icon}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-valasys-orange">
          <GripHorizontal className="w-4 h-4" />
        </div>
      </div>
      <span className="text-xs font-medium text-gray-900 text-center">
        {block.label}
      </span>
    </button>
  );
};

interface SectionsPanelProps {
  onAddBlock: (block: LandingPageBlock) => void;
}

const SectionsPanel: React.FC<SectionsPanelProps> = ({ onAddBlock }) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set([
      "hero",
      "headers",
      "content",
      "media",
      "cta",
      "features",
      "testimonials",
      "forms",
      "footer",
    ])
  );

  const sections: Section[] = [
    {
      id: "hero",
      title: "Hero Section",
      blocks: [
        {
          id: "hero",
          icon: <Image className="w-6 h-6" />,
          label: "Hero",
          description: "Large hero section with headline and CTA",
          onCreate: createHeroBlock,
        },
        {
          id: "hero-spacer",
          icon: <Layers className="w-6 h-6" />,
          label: "Spacer",
          description: "Add vertical spacing",
          onCreate: createSectionSpacerBlock,
        },
      ],
    },
    {
      id: "headers",
      title: "Headers & Navigation",
      blocks: [
        {
          id: "header",
          icon: <Menu className="w-6 h-6" />,
          label: "Header",
          description: "Navigation bar with logo and links",
          onCreate: createHeaderBlock,
        },
      ],
    },
    {
      id: "content",
      title: "Text & Content",
      blocks: [
        {
          id: "heading",
          icon: <Type className="w-6 h-6" />,
          label: "Heading",
          description: "Section headline",
          onCreate: () => createHeadingBlock("h2"),
        },
        {
          id: "paragraph",
          icon: <FileText className="w-6 h-6" />,
          label: "Paragraph",
          description: "Body text content",
          onCreate: createParagraphBlock,
        },
        {
          id: "rich-text",
          icon: <Type className="w-6 h-6" />,
          label: "Rich Text",
          description: "Formatted text block",
          onCreate: createRichTextBlock,
        },
        {
          id: "quote",
          icon: <MessageSquare className="w-6 h-6" />,
          label: "Quote",
          description: "Highlighted quote",
          onCreate: createQuoteBlock,
        },
        {
          id: "about",
          icon: <FileText className="w-6 h-6" />,
          label: "About",
          description: "About section",
          onCreate: createAboutBlock,
        },
      ],
    },
    {
      id: "media",
      title: "Images & Media",
      blocks: [
        {
          id: "image",
          icon: <Image className="w-6 h-6" />,
          label: "Image",
          description: "Add an image",
          onCreate: () => {
            const block = createHeadingBlock("h2");
            block.type = "image";
            return block;
          },
        },
      ],
    },
    {
      id: "cta",
      title: "Call to Action",
      blocks: [
        {
          id: "signup",
          icon: <Mail className="w-6 h-6" />,
          label: "Signup",
          description: "Newsletter signup form",
          onCreate: createSignupBlock,
        },
      ],
    },
    {
      id: "features",
      title: "Features",
      blocks: [
        {
          id: "features",
          icon: <Grid2x2 className="w-6 h-6" />,
          label: "Features",
          description: "Feature grid section",
          onCreate: createFeaturesBlock,
        },
      ],
    },
    {
      id: "testimonials",
      title: "Testimonials & Social Proof",
      blocks: [
        {
          id: "testimonials",
          icon: <Users className="w-6 h-6" />,
          label: "Testimonials",
          description: "Customer testimonials",
          onCreate: createTestimonialsBlock,
        },
      ],
    },
    {
      id: "forms",
      title: "Forms",
      blocks: [
        {
          id: "contact-form",
          icon: <Phone className="w-6 h-6" />,
          label: "Contact Form",
          description: "Contact form section",
          onCreate: createContactFormBlock,
        },
      ],
    },
    {
      id: "pricing",
      title: "Pricing",
      blocks: [
        {
          id: "pricing",
          icon: <TrendingUp className="w-6 h-6" />,
          label: "Pricing",
          description: "Pricing plans section",
          onCreate: createPricingBlock,
        },
        {
          id: "pricing-footer",
          icon: <Settings className="w-6 h-6" />,
          label: "Pricing Footer",
          description: "Pricing footer",
          onCreate: createPricingFooterBlock,
        },
      ],
    },
    {
      id: "faq",
      title: "FAQ",
      blocks: [
        {
          id: "faq",
          icon: <HelpCircle className="w-6 h-6" />,
          label: "FAQ",
          description: "Frequently asked questions",
          onCreate: createFaqBlock,
        },
      ],
    },
    {
      id: "footer",
      title: "Footer",
      blocks: [
        {
          id: "footer",
          icon: <Layers className="w-6 h-6" />,
          label: "Footer",
          description: "Page footer",
          onCreate: createFooterBlock,
        },
      ],
    },
  ];

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="border-b border-gray-200">
        {sections.map((section) => (
          <div
            key={section.id}
            className="border-b border-gray-200 last:border-b-0"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-900">
                {section.title}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-600 transition-transform ${
                  expandedSections.has(section.id) ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedSections.has(section.id) && (
              <div className="px-4 py-3 bg-white border-t border-gray-200">
                <div className="grid grid-cols-2 gap-3">
                  {section.blocks.map((block) => (
                    <DraggableBlockButton
                      key={block.id}
                      block={block}
                      onAddBlock={onAddBlock}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const BlocksPanel: React.FC<BlocksPanelProps> = ({ onAddBlock }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const blockOptions: BlockOption[] = [
    {
      id: "hero",
      icon: <Image className="w-6 h-6" />,
      label: "Hero",
      description: "Large hero section",
      onCreate: createHeroBlock,
    },
    {
      id: "header",
      icon: <Menu className="w-6 h-6" />,
      label: "Header",
      description: "Navigation header",
      onCreate: createHeaderBlock,
    },
    {
      id: "heading",
      icon: <Type className="w-6 h-6" />,
      label: "Heading",
      description: "Section heading",
      onCreate: () => createHeadingBlock("h2"),
    },
    {
      id: "paragraph",
      icon: <FileText className="w-6 h-6" />,
      label: "Paragraph",
      description: "Text content",
      onCreate: createParagraphBlock,
    },
    {
      id: "features",
      icon: <Grid2x2 className="w-6 h-6" />,
      label: "Features",
      description: "Feature grid",
      onCreate: createFeaturesBlock,
    },
    {
      id: "testimonials",
      icon: <Users className="w-6 h-6" />,
      label: "Testimonials",
      description: "Customer testimonials",
      onCreate: createTestimonialsBlock,
    },
    {
      id: "contact-form",
      icon: <Phone className="w-6 h-6" />,
      label: "Contact Form",
      description: "Contact form",
      onCreate: createContactFormBlock,
    },
    {
      id: "signup",
      icon: <Mail className="w-6 h-6" />,
      label: "Signup",
      description: "Newsletter signup",
      onCreate: createSignupBlock,
    },
    {
      id: "pricing",
      icon: <TrendingUp className="w-6 h-6" />,
      label: "Pricing",
      description: "Pricing plans",
      onCreate: createPricingBlock,
    },
    {
      id: "faq",
      icon: <HelpCircle className="w-6 h-6" />,
      label: "FAQ",
      description: "FAQ section",
      onCreate: createFaqBlock,
    },
    {
      id: "footer",
      icon: <Layers className="w-6 h-6" />,
      label: "Footer",
      description: "Page footer",
      onCreate: createFooterBlock,
    },
    {
      id: "spacer",
      icon: <Layers className="w-6 h-6" />,
      label: "Spacer",
      description: "Vertical spacing",
      onCreate: createSectionSpacerBlock,
    },
  ];

  const filteredBlocks = blockOptions.filter(
    (block) =>
      block.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col bg-white border-r border-gray-200 w-full h-full">
      <Tabs defaultValue="sections" className="flex flex-col h-full">
        <TabsList className="sticky top-0 z-20 flex w-full h-auto rounded-none border-b border-gray-200 bg-white p-0">
          <TabsTrigger
            value="blocks"
            className="flex-1 rounded-none px-4 py-3 text-gray-600 border-b-2 border-transparent data-[state=active]:border-valasys-orange data-[state=active]:text-gray-900 data-[state=active]:bg-white shadow-none"
          >
            Blocks
          </TabsTrigger>
          <TabsTrigger
            value="sections"
            className="flex-1 rounded-none px-4 py-3 text-gray-600 border-b-2 border-transparent data-[state=active]:border-valasys-orange data-[state=active]:text-gray-900 data-[state=active]:bg-white shadow-none"
          >
            Sections
          </TabsTrigger>
        </TabsList>

        <TabsContent value="blocks" className="flex flex-col m-0 flex-1">
          <div className="p-4 border-b border-gray-200 sticky top-[52px] bg-white z-20">
            <Input
              placeholder="Search blocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-sm"
            />
          </div>

          <div className="p-4 overflow-y-auto flex-1">
            <div className="grid grid-cols-2 gap-3">
              {filteredBlocks.map((block) => (
                <DraggableBlockButton
                  key={block.id}
                  block={block}
                  onAddBlock={onAddBlock}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sections" className="flex flex-col m-0 flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <SectionsPanel onAddBlock={onAddBlock} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
