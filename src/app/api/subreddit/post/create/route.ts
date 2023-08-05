import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) return new Response("Unauthourized", { status: 401 });

    const body = await req.json();

    const { subredditId, title, content } = PostValidator.parse(body);

    console.log({ subredditId, title, content });

    const subcriptionExists = await db.subcription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    });

    if (!subcriptionExists) {
      return new Response("Subcribe to post", {
        status: 400,
      });
    }

    await db.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
        subredditId,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid POST request data pass", { status: 422 });
    }

    return new Response(
      "Could not post to subreddit at this time, please try again later",
      {
        status: 500,
      }
    );
  }
}
