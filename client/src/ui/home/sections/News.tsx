import { useEffect, useState } from "react";

const RELEASE_NOTES_URL =
  "https://raw.githubusercontent.com/glennhenry/Zombie-Pandemic-Recreated/main/README.md";

export default function News() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    fetch(RELEASE_NOTES_URL)
      .then((res) => res.text())
      .then((text) => {
        const allLines = text.trim().split("\n");
        setLines(allLines.slice(0, 30));
      })
      .catch(console.error);
  }, []);

  const renderLine = (line: string, idx: number) => {
    if (line.startsWith("#")) {
      return (
        <h2 key={idx} className="text-md mt-3 font-bold">
          {line.replace(/^#+\s*/, "")}
        </h2>
      );
    } else if (line.startsWith("-")) {
      return (
        <li key={idx} className="ml-5 list-disc">
          {line.slice(1).trim()}
        </li>
      );
    } else if (line.trim() === "") {
      return <br key={idx} />;
    } else {
      return (
        <p key={idx} className="text-sm">
          {line}
        </p>
      );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-paragraph text-xl">News</h1>

      <div className="max-h-96 overflow-y-auto p-3 text-sm whitespace-pre-wrap text-paragraph">
        {lines.map((line, idx) => renderLine(line, idx))}

        <p>
          ...and more{"\n\n"}
          <a
            href="https://github.com/glennhenry/Zombie-Pandemic-Recreated/blob/main/release-notes.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-paragraph underline"
          >
            See full →
          </a>
        </p>
      </div>
    </div>
  );
}
