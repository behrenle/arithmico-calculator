import React from "react";
import ReactMarkdown from "react-markdown";
import useContent from "../../hooks/use-content";

interface BlogEntryProps {
  path: string;
}

export default function BlogEntry({ path }: BlogEntryProps) {
  const content = useContent(path);

  return (
    <section className="">
      <ReactMarkdown
        components={{
          h1({ children }) {
            return (
              <h1 className="mt-4 mb-1 font-normal text-4xl">{children}</h1>
            );
          },
          h2({ children }) {
            return (
              <h2 className="mt-4 mb-1 font-normal text-3xl">{children}</h2>
            );
          },
          h3({ children }) {
            return (
              <h3 className="mt-4 mb-1 font-normal text-2xl">{children}</h3>
            );
          },
          h4({ children }) {
            return (
              <h4 className="mt-4 mb-1 font-normal text-xl">{children}</h4>
            );
          },
          h5({ children }) {
            return (
              <h5 className="mt-4 mb-1 font-normal text-lg">{children}</h5>
            );
          },
          h6({ children }) {
            return (
              <h6 className="mt-4 mb-1 font-normal text-base">{children}</h6>
            );
          },
          code({ children, inline }) {
            if (inline) {
              return (
                <code className="bg-black/20 py-0.5 px-1 rounded-md font-mono">
                  {children}
                </code>
              );
            }
            const lines = ((children ?? [""])[0] as string)
              .split("\n")
              .filter((line) => line.length > 0);
            return (
              <pre className="bg-black/20 p-1 rounded-md">
                {lines.map((line, index) => (
                  <code key={index}>{line}{"\n"}</code>
                ))}
              </pre>
            );
          },
          ul({children}) {
            return <ul className="list-disc pl-2">{children}</ul>
          },
          li({children}) {
            return <li className="ml-4">{children}</li>
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </section>
  );
}
