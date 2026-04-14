import { component$ } from "@builder.io/qwik";
import type { PortableTextBlock } from "~/lib/blog";

type PortableTextProps = {
  blocks?: PortableTextBlock[];
};

function renderText(block: PortableTextBlock): string {
  return (block.children || []).map((child) => child.text || "").join("");
}

export const PortableText = component$<PortableTextProps>(({ blocks = [] }) => {
  const nodes: any[] = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];

    if (block?._type !== "block") {
      continue;
    }

    if (block.listItem === "bullet" || block.listItem === "number") {
      const items: PortableTextBlock[] = [block];
      const listType = block.listItem;

      while (
        index + 1 < blocks.length &&
        blocks[index + 1]?.listItem === listType
      ) {
        items.push(blocks[index + 1]);
        index += 1;
      }

      const Tag = listType === "number" ? "ol" : "ul";
      nodes.push(
        <Tag key={block._key || `list-${index}`}>
          {items.map((item, itemIndex) => (
            <li key={item._key || `${listType}-${itemIndex}`}>
              {renderText(item)}
            </li>
          ))}
        </Tag>,
      );
      continue;
    }

    const text = renderText(block);

    switch (block.style) {
      case "h2":
        nodes.push(<h2 key={block._key || `h2-${index}`}>{text}</h2>);
        break;
      case "h3":
        nodes.push(<h3 key={block._key || `h3-${index}`}>{text}</h3>);
        break;
      case "blockquote":
        nodes.push(
          <blockquote key={block._key || `quote-${index}`}>{text}</blockquote>,
        );
        break;
      default:
        nodes.push(<p key={block._key || `p-${index}`}>{text}</p>);
        break;
    }
  }

  return <>{nodes}</>;
});
