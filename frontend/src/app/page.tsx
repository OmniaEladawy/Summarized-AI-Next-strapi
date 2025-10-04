import { HeroSection } from "@/components/custome/HeroSection";
import qs from "qs";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            link: {
              populate: true,
            },
          },
        },
      },
    },
  },
});

async function fetchStrapiData(path: string) {
  const baseUrl = "http://localhost:1337";
  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  try {
    const response = await fetch(url.href, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization:
          "Bearer b1b08f42d68ed9a7ca3d0e760914f70ff537220003d5f20cf2981f37192d2fe374187e49381b5996c6ba4596e642b0441e452c84be5cfa5664d8629f87c6c0b967e16ea9bb1293004c75f78317755ed2398f7f9f6745751f3453e81993f1e846e45e8a515cc340efd5f6ff1181868cef372aef9781601ed111b5211bf5915cb7",
      },
    });
    const data = await response.json();
    console.dir(data, { depth: null });
    return data;
  } catch (error) {
    console.error("Error fetching data from Strapi:", error);
  }
}

export default async function Home() {
  const strapiData = await fetchStrapiData("/api/home-page");
  const { blocks } = strapiData.data;
  console.log(strapiData);
  return (
    <main>
      <HeroSection data={blocks[0]} />
    </main>
  );
}
