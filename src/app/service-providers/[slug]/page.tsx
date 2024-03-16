import { createClient } from "@/utils/supabase/client";
import AuthButton from "../../../components/AuthButton";
import Image from "next/image";

export async function generateStaticParams() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("service_providers")
    .select("slug");

  if (error) {
    throw error;
  }

  return data.map((provider) => ({
    slug: provider.slug,
  }));
}

async function getData(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("service_providers")
    .select(
      `
      *,
      service_provider_descriptions (
        description
      )
    `
    )
    .eq("slug", slug)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export default async function ServiceProviderProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const provider = await getData(params.slug);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
          <AuthButton />
        </div>
      </nav>
      {/* Generate a business profile page for a service provider named Sam's cleaning */}
      <div className="w-full max-w-4xl flex flex-col gap-8 items-center p-8">
        <h1 className="text-3xl font-bold">{provider.name}</h1>
        {provider.profile_image_url && (
          <Image
            src={provider.profile_image_url}
            alt={provider.name}
            width={400}
            height={400}
          />
        )}
        <p>{provider.service_provider_descriptions?.description}</p>
      </div>
    </div>
  );
}
