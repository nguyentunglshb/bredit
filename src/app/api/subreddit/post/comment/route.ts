import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CommentValidator } from "@/lib/validators/comment";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const session = await getAuthSession();

    const { postId, text, replyToId } = CommentValidator.parse(body);

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.comment.create({
      data: {
        text,
        postId,
        authorId: session.user.id,
        replyToId,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof Error) {
      return new Response("Invalid request data pass", { status: 422 });
    }

    return new Response("Could not create comment", { status: 500 });
  }
}
