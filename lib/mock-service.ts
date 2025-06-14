import seed from "@/mock/seed";
import { Property, PropertyWithRelations } from "@/types";

let dataCache: Awaited<ReturnType<typeof seed>> | null = null;

export async function loadMockData() {
  if (!dataCache) {
    dataCache = await seed();
  }
  return dataCache;
}

export async function getLatestProperties(): Promise<Property[]> {
  const { properties } = await loadMockData();
  return properties.slice(0, 5);
}

export async function getProperties({
  query = "",
  filter = "",
  limit = 6,
}: {
  query?: string;
  filter?: string;
  limit?: number;
}): Promise<Property[]> {
  const { properties } = await loadMockData();

  let result = properties;

  if (query) {
    result = result.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (filter) {
    result = result.filter((p) => p.type === filter);
  }

  return result.slice(0, limit);
}

export async function getPropertyById(
  id: string
): Promise<PropertyWithRelations | null> {
  const { properties, agents, reviews, galleries } = await loadMockData();
  const property = properties.find((p) => p.id === id);

  if (!property) return null;

  return {
    ...property,
    agent: agents.find((a) => a.id === property.agentId),
    reviews: reviews.filter((r) => property.reviewIds.includes(r.id)),
    gallery: galleries.filter((g) => property.galleryIds.includes(g.id)),
  };
}
