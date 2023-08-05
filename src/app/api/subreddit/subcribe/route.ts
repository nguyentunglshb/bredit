import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubredditSubcriptionValidator } from "@/lib/validators/subreddit";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) return new Response("Unauthourized", { status: 401 });

    const body = await req.json();

    const { subredditId } = SubredditSubcriptionValidator.parse(body);

    const subcriptionExists = await db.subcription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    });

    if (subcriptionExists) {
      return new Response("You are already subcribed to this subreddit", {
        status: 400,
      });
    }

    await db.subcription.create({
      data: {
        subredditId,
        userId: session.user.id,
      },
    });

    return new Response(subredditId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data pass", { status: 422 });
    }

    return new Response("Could not subcribe, please try again later", {
      status: 500,
    });
  }
}
