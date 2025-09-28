import { Button } from "@/components/ui/button";

async function fetchStrapiData(path: string) {
  const baseUrl = "http://localhost:1337";
  try {
    const response = await fetch(baseUrl + path, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer b1b08f42d68ed9a7ca3d0e760914f70ff537220003d5f20cf2981f37192d2fe374187e49381b5996c6ba4596e642b0441e452c84be5cfa5664d8629f87c6c0b967e16ea9bb1293004c75f78317755ed2398f7f9f6745751f3453e81993f1e846e45e8a515cc340efd5f6ff1181868cef372aef9781601ed111b5211bf5915cb7",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from Strapi:", error);
  }
}

export default async function Home() {
  const strapiData = await fetchStrapiData("/api/home-page");
  const { title, description } = strapiData.data;
  console.log(strapiData);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{title}</h1>
      <p>{description}</p>
      <Button>Click Me</Button>
    </main>
  );
}
