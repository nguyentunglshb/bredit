"use client";

import { useCustomToast } from "@/hooks/use-custom-toast";
import { usePrevious } from "@mantine/hooks";
import { type VoteType } from "@prisma/client";
import React, { FC, useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { PostVoteRequest } from "@/lib/validators/vote";
import axios from "axios";

interface PostVoteClientProps {
  postId: string;
  initialVotesAmt: number;
  initialVote?: VoteType | null;
}

const PostVoteClient: FC<PostVoteClientProps> = ({
  postId,
  initialVote,
  initialVotesAmt,
}) => {
  const { loginToast } = useCustomToast();

  const [votesAmt, setVotesAmt] = useState(initialVotesAmt);
  const [currentVote, setCurrentVote] = useState(initialVote);

  const prevVote = usePrevious(currentVote);

  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  const {} = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: PostVoteRequest = {
        postId,
        voteType,
      };

      await axios.patch("/api/subreddit/post/vote", payload);
    },
  });

  return (
    <div className="flex sm:flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
      <Button size="sm" variant="ghost" aria-label="upvote">
        <ArrowBigUp
          className={cn("w-5 h-5 text-zinc-700", {
            "text-emerald-500 fill-emerald-500": currentVote === "UP",
          })}
        />
      </Button>

      <p className="text-center py-2 font-medium text-sm text-zinc-900">
        {votesAmt}
      </p>

      <Button size="sm" variant="ghost" aria-label="upvote">
        <ArrowBigDown
          className={cn("w-5 h-5 text-zinc-700", {
            "text-red-500 fill-red-500": currentVote === "DOWN",
          })}
        />
      </Button>
    </div>
  );
};

export default PostVoteClient;