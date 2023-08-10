import { formatTimeToNow } from "@/lib/utils";
import type { User, Vote, Post } from "@prisma/client";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import React, { FC, useRef } from "react";
import EditorOutput from "./EditorOutput";
import PostVoteClient from "./post-vote/PostVoteClient";

type PartialVote = Pick<Vote, "type">;

interface PostProps {
  subredditName: string;
  post: Post & {
    author: User;
    votes: Vote[];
  };
  commentAmt: number;
  votesAmt: number;
  currentVote?: PartialVote;
}

const Post: FC<PostProps> = ({
  subredditName,
  post: { id, title, author, votes, createdAt, content },
  commentAmt,
  votesAmt: _votesAmt,
  currentVote,
}) => {
  const pRef = useRef<HTMLDivElement>(null);

  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        <PostVoteClient
          initialVotesAmt={_votesAmt}
          postId={id}
          initialVote={currentVote?.type}
        />
        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            {subredditName ? (
              <>
                <a
                  href={`/r/${subredditName}`}
                  className="underline text-zinc-900 text-sm underline-offset-2"
                >
                  r/{subredditName}
                </a>
                <span className="px-1">.</span>
              </>
            ) : null}
            <span>Posted by u/{author.name}</span>{" "}
            {formatTimeToNow(new Date(createdAt))}
          </div>

          <Link href={`/r/${subredditName}/post/${id}`}>
            <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
              {title}
            </h1>
          </Link>

          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={pRef}
          >
            <EditorOutput content={content} />
            {pRef.current?.clientHeight === 160 ? (
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6">
        <Link
          href={`/r/${subredditName}/post/${id}`}
          className="w-fit flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" /> {commentAmt} comments
        </Link>
      </div>
    </div>
  );
};

export default Post;
