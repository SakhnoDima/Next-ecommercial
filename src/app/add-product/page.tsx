import CustomButton from "@/components/CustomButton";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Add your product page",
  description: "We make your wallet cry",
};

async function addProduct(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price")) || 0;

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  });

  redirect("/");
}

export default async function addProductPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input input-bordered mb-4 w-full"
          type="text"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-4 w-full"
        ></textarea>
        <input
          required
          name="imageUrl"
          type="url"
          placeholder="Image URL"
          className="input input-bordered mb-4 w-full"
        />
        <input
          required
          name="price"
          type="number"
          placeholder="Price"
          className="input input-bordered mb-4 w-full"
        />
        <CustomButton className="btn-block" type="submit">
          Add Product
        </CustomButton>
      </form>
    </div>
  );
}
