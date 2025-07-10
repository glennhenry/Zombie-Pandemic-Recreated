import { useEffect, useState } from "react";

const RELEASE_NOTES_URL =
  "https://raw.githubusercontent.com/glennhenry/Zombie-Pandemic-Recreated/main/release-notes.md";

export default function News() {
  const [lines, setLines] = useState<string[]>([]);
  const [isTrimmed, setIsTrimmed] = useState<boolean>(false);

  useEffect(() => {
    fetch(RELEASE_NOTES_URL)
      .then((res) => res.text())
      .then((text) => {
        const allLines = text.trim().split("\n");
        setIsTrimmed(allLines.length > 50);
        setLines(allLines.slice(0, 50));
      })
      .catch(console.error);
  }, []);

  const renderLine = (line: string, idx: number) => {
    if (line.startsWith("#")) {
      const headingTopMargin = idx !== 0 ? "mt-3" : "mt-0";

      return (
        <h2 key={idx} className={`text-md ${headingTopMargin} font-bold`}>
          {line.replace(/^#+\s*/, "")}
        </h2>
      );
    } else if (line.startsWith("-")) {
      return (
        <li key={idx} className="ml-5 list-disc">
          {line.slice(1).trim()}
        </li>
      );
    } else {
      return (
        <p key={idx} className="mt-2 text-sm">
          {line}
        </p>
      );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-paragraph text-xl">News</h1>

      <div className="max-h-96 overflow-y-auto p-1 text-sm whitespace-pre-wrap text-paragraph">
        {lines.map((line, idx) => renderLine(line, idx))}

        <p>
          {isTrimmed && <p>...and more{"\n\n"}</p>}

          <a
            href="https://github.com/glennhenry/Zombie-Pandemic-Recreated/blob/main/release-notes.md"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-paragraph underline"
          >
            See full →
          </a>
        </p>
      </div>
    </div>
  );
}
