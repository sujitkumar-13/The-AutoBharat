import blogFeatured1 from "@/assets/blog-featured-1.jpg";
import blogFeatured2 from "@/assets/blog-featured-2.jpg";
import blogFeatured3 from "@/assets/blog-featured-3.jpg";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  featured_image: string;
  published_at: string;
  meta_title: string;
  meta_description: string;
  ad_html?: string;
}

export const categories = [
  "Supercars",
  "Electric",
  "Classic",
  "Motorsport",
  "Reviews",
  "Industry",
];

export const mockPosts: BlogPost[] = [
  {
    id: "1",
    slug: "bugatti-tourbillon-new-era",
    title: "Bugatti Tourbillon Marks A New Era of Hypercar Engineering",
    category: "Supercars",
    excerpt:
      "The successor to the Chiron arrives with a naturally aspirated V16 and a design philosophy that redefines what a hypercar can be.",
    content: `<p>The automotive world stood still when Bugatti unveiled the Tourbillon — a machine that doesn't just replace the Chiron, but reimagines the very concept of a hypercar.</p>
<p>At its heart lies a bespoke 8.3-litre naturally aspirated V16 engine, a deliberate departure from the turbocharged W16 that defined its predecessor. This isn't regression — it's a statement. The Tourbillon produces over 1,000 horsepower from combustion alone, supplemented by three electric motors that push the combined output beyond 1,800 horsepower.</p>
<h2>Design Language</h2>
<p>Every surface of the Tourbillon has been sculpted with aerodynamic purpose. The centerline runs unbroken from nose to tail, a signature Bugatti trait elevated to new heights. The horseshoe grille, now more integrated than ever, channels air with surgical precision.</p>
<h2>Interior Craftsmanship</h2>
<p>The cabin is where engineering meets horology. The instrument cluster is a mechanical marvel — a Swiss-made analog display that rotates with the steering column, ensuring perfect visibility regardless of wheel position. No screens, no compromise.</p>
<p>Materials range from aerospace-grade titanium to hand-stitched leather, each element placed with the precision of a master watchmaker.</p>`,
    featured_image: blogFeatured1,
    published_at: "2025-12-15",
    meta_title: "Bugatti Tourbillon: The New Hypercar Era | AutoBharat",
    meta_description:
      "Explore the Bugatti Tourbillon — a V16 hypercar masterpiece redefining engineering and luxury.",
  },
  {
    id: "2",
    slug: "electric-future-indian-automotive",
    title: "The Electric Revolution Reshaping India's Automotive Landscape",
    category: "Electric",
    excerpt:
      "From Tata to Mahindra, Indian manufacturers are betting big on electrification. We explore what this means for the future.",
    content: `<p>India's automotive industry is undergoing its most significant transformation in decades. The shift to electric vehicles isn't just a trend — it's a fundamental restructuring of how the nation moves.</p>
<p>Tata Motors leads the charge with an expanding EV portfolio, while Mahindra's Born Electric platform promises SUVs that rival global competitors. Meanwhile, startups like Ather Energy and Ola Electric are redefining two-wheeler mobility.</p>
<h2>Infrastructure Challenge</h2>
<p>The real battle isn't in showrooms — it's on highways. India's charging infrastructure, while growing rapidly, still lags behind adoption rates. Government initiatives like FAME III aim to bridge this gap.</p>`,
    featured_image: blogFeatured2,
    published_at: "2025-11-28",
    meta_title:
      "Electric Revolution in India's Auto Industry | AutoBharat",
    meta_description:
      "How Indian automakers are leading the electric vehicle revolution with bold new platforms and technologies.",
  },
  {
    id: "3",
    slug: "art-of-brake-engineering",
    title: "Carbon Ceramic Brakes: The Art of Stopping Power",
    category: "Reviews",
    excerpt:
      "Why the world's fastest cars trust carbon ceramic technology, and what it means for everyday performance.",
    content: `<p>In a world obsessed with acceleration, the ability to stop is equally — if not more — important. Carbon ceramic brakes represent the pinnacle of braking technology.</p>
<p>Developed initially for Formula 1, these brakes operate at temperatures that would destroy conventional steel discs. Their resistance to brake fade under extreme conditions makes them the choice of every serious hypercar manufacturer.</p>
<h2>The Manufacturing Process</h2>
<p>Creating a carbon ceramic disc takes weeks. Carbon fiber is layered, compressed, and heated to over 1,700°C. The result is a disc that's 50% lighter than steel yet dramatically more durable.</p>`,
    featured_image: blogFeatured3,
    published_at: "2025-11-10",
    meta_title: "Carbon Ceramic Brakes Explained | AutoBharat",
    meta_description:
      "Deep dive into carbon ceramic brake technology — from F1 origins to hypercar applications.",
  },
];
