"use client";

import React, { FC, startTransition } from "react";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { SubcribeToSubredditPayload } from "@/lib/validators/subreddit";
import axios, { AxiosError } from "axios";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface SubcribeLeaveToggleProps {
  subredditId: string;
  subredditName: string;
  isSubcribed: boolean;
}

const SubcribeLeaveToggle: FC<SubcribeLeaveToggleProps> = ({
  subredditId,
  subredditName,
  isSubcribed,
}) => {
  const { loginToast } = useCustomToast();

  const router = useRouter();

  const { mutate: unsubcribe, isLoading: isUnsubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubcribeToSubredditPayload = {
        subredditId,
      };
      const { data } = await axios.post("/api/subreddit/unsubcribe", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "There was a problem",
        description: "Something when wrong, Please try again",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
      return toast({
        title: "Unsubcribed",
        description: `You are now unsubcribed to ${subredditName}`,
      });
    },
  });
  const { mutate: subcribe, isLoading: isSubloading } = useMutation({
    mutationFn: async () => {
      const payload: SubcribeToSubredditPayload = {
        subredditId,
      };
      const { data } = await axios.post("/api/subreddit/subcribe", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "There was a problem",
        description: "Something when wrong, Please try again",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
      return toast({
        title: "Subcribed",
        description: `You are now subcribed to ${subredditName}`,
      });
    },
  });

  return isSubcribed ? (
    <Button
      className="w-full mt-1 mb-4"
      isLoading={isUnsubLoading}
      onClick={() => unsubcribe()}
    >
      Leave comminuty
    </Button>
  ) : (
    <Button
      className="w-full mt-1 mb-4"
      isLoading={isSubloading}
      onClick={() => subcribe()}
    >
      Join to post
    </Button>
  );
};

export default SubcribeLeaveToggle;
