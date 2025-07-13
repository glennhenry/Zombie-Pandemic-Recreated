import { useEffect, useState } from "react";
import type { Contributor } from "../../types/Contributor";

export default function About() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [totalContributors, setTotalContributors] = useState(12);

  useEffect(() => {
    fetch(
      "https://api.github.com/repos/glennhenry/Zombie-Pandemic-Recreated/contributors",
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("total contirubotrs: ", data.length);
        setTotalContributors(data.length);

        setContributors(
          data.slice(0, 6).map((contributor: any) => ({
            name: contributor.login,
            avatarUrl: contributor.avatar_url,
          })),
        );
      })
      .catch((err) => console.error("Error on fetch contributors: ", err));
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-xl">About</h1>
      <p className="text-sm text-paragraph">
        ZPRecreated — is a community-driven, open-source fan project that tries
        to recreate the classic Zombie Pandemic.
      </p>
      <h2 className="mt-2 text-lg">Community</h2>
      <p className="text-sm text-paragraph">
        Join the community, follow development, or get support:{" "}
        <a
          href="https://github.com/glennhenry/Zombie-Pandemic-Recreated"
          target="_blank"
          rel="noopener noreferrer"
          className="emphasized link"
        >
          GitHub
        </a>
        {" | "}
        <a
          href="https://discord.com/invite/Yrzsk7n6nf"
          target="_blank"
          rel="noopener noreferrer"
          className="emphasized link"
        >
          Discord
        </a>
      </p>
      <div>
        <h2 className="mt-2 text-lg">Contributors</h2>
        <p className="text-sm text-paragraph">
          Thanks to the following contributors:
        </p>
        <div className="mt-2 flex w-full max-w-120 flex-row gap-2">
          {contributors.map((contributor) => (
            <div>{ContributorAvatar(contributor)}</div>
          ))}
          {contributors.length > 5 && (
            <span className="self-center text-xs text-paragraph">
              ...and {totalContributors} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const ContributorAvatar = ({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl: string;
}) => {
  return (
    <div>
      <img
        src={avatarUrl}
        title={name}
        className="size-10 rounded-full"
        alt={name}
      />
    </div>
  );
};
