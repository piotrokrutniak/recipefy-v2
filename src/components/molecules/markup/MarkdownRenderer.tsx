import parse, {
  HTMLReactParserOptions,
  Element,
  domToReact,
} from "html-react-parser";
import { TextH1, TextH2, TextP, TextMedium } from "@/components/typography";
interface MarkupRendererProps {
  content: string;
}

// TODO: Fix types
export const MarkupRenderer = ({ content }: MarkupRendererProps) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode: Element) => {
      if (!(domNode instanceof Element)) {
        return;
      }
      switch (domNode.name) {
        case "h1":
          return <TextH1>{domToReact(domNode.children, options)}</TextH1>;
        case "h2":
          return <TextH2>{domToReact(domNode.children, options)}</TextH2>;
        case "p":
          return (
            <TextP noLeading>{domToReact(domNode.children, options)}</TextP>
          );
        case "ul":
          return (
            <ul className="list-disc ml-6">
              {domToReact(domNode.children, options)}
            </ul>
          );
        case "li":
          return (
            <TextMedium className="list-item">
              {domToReact(domNode.children, options)}
            </TextMedium>
          );
        case "strong":
          return (
            <span className="font-bold">
              {domToReact(domNode.children, options)}
            </span>
          );
        case "em":
          return (
            <span className="italic">
              {domToReact(domNode.children, options)}
            </span>
          );
        case "a":
          return (
            <a
              href={domNode.attribs.href}
              className="text-primary hover:underline"
            >
              {domToReact(domNode.children, options)}
            </a>
          );
      }
    },
  };
  return <div>{parse(content, options)}</div>;
};
