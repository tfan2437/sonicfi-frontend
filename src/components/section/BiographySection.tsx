import { formatNumber } from "@/lib/format";
import { Artist } from "@/types";
import React, { JSX } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface BiographySectionProps {
  artist: Artist;
  className?: string;
}

const BiographySection = ({
  artist,
  className = "",
}: BiographySectionProps) => {
  // Split biography into paragraphs
  const paragraphs = artist.biography.split(/\n\s*\n/);

  // Convert text to React elements (safer approach)
  const convertToReactElements = (text: string): (string | JSX.Element)[] => {
    const parts: (string | JSX.Element)[] = [];

    let lastIndex = 0;
    let match;

    // Process artist links
    const combinedRegex =
      /(<a href="spotify:(artist|search):([^"]+)">([^<]+)<\/a>)/g;

    while ((match = combinedRegex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const [fullMatch, , linkType, id, displayText] = match;
      const key = `${linkType}-${id}-${parts.length}`;

      if (linkType === "artist") {
        parts.push(
          <Link
            key={key}
            to={`/artist/${id}`}
            className="text-white hover:underline"
          >
            {displayText}
          </Link>
        );
      } else if (linkType === "search") {
        const encodedQuery = encodeURIComponent(id.replace(/\+/g, " "));
        parts.push(
          <Link
            key={key}
            to={`/search/${encodedQuery}`}
            className="text-white hover:underline"
          >
            {displayText}
          </Link>
        );
      }

      lastIndex = match.index + fullMatch.length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  const renderWithReactElements = () => (
    <div
      className={twMerge("text-base leading-loose prose max-w-none", className)}
    >
      {paragraphs.map((paragraph, paragraphIndex) => (
        <p key={paragraphIndex} className="mb-6">
          {convertToReactElements(paragraph).map((part, index) => (
            <React.Fragment key={index}>{part}</React.Fragment>
          ))}
        </p>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col w-full">
      <h1 className="font-montserrat text-2xl font-semibold mb-1">Biography</h1>
      <div className="bg-zinc-900 p-4 rounded w-full flex flex-col gap-2">
        <div className="w-full h-auto relative">
          <img
            src={artist.header_image.url}
            alt="artist"
            className="w-full rounded"
          />
        </div>
        <div className="mt-4 mb-2 flex flex-row gap-6 items-center">
          <h1 className="text-white text-3xl font-bold px-4 py-2 bg-blue-500 rounded-full">
            {`#${artist.world_rank} World Rank`}
          </h1>
          <p className="text-3xl font-bold text-white">
            {formatNumber(artist.monthly_listeners)}
            <span className="text-base ml-2 font-normal text-zinc-400">
              Monthly Listeners
            </span>
          </p>
          <p className="text-3xl font-bold text-white">
            {formatNumber(artist.followers)}
            <span className="text-base ml-2 font-normal text-zinc-400">
              Followers
            </span>
          </p>
        </div>
        {renderWithReactElements()}
      </div>
    </div>
  );
};

export default BiographySection;
