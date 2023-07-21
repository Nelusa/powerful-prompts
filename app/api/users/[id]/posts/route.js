import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();

    const prompts = await Prompt.find({
      creator: params.id, //jediná změna oproti fetchování všech promptů
    }).populate("creator"); //populate() --> mongoose method, který nám umožňuje získat data z jiné kolekce (v tomto případě z kolekce User)

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
