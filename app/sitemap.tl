import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://malydetektyw.pl",
      lastModified: new Date(),
    },
    {
      url: "https://malydetektyw.pl/blog",
      lastModified: new Date(),
    },
    {
      url: "https://malydetektyw.pl/blog/prezent-dla-dziecka-10-lat",
      lastModified: new Date(),
    },
    {
      url: "https://malydetektyw.pl/blog/zagadki-logiczne-dla-dzieci-8-lat",
      lastModified: new Date(),
    },
    {
      url: "https://malydetektyw.pl/blog/zabawa-bez-ekranu-dla-dzieci",
      lastModified: new Date(),
    },
    {
      url: "https://malydetektyw.pl/blog/jak-oderwac-dziecko-od-tabletu",
      lastModified: new Date(),
    },
    {
      url: "https://malydetektyw.pl/darmowa-zagadka",
      lastModified: new Date(),
    },
    {
      url: "https://malydetektyw.pl/kontakt",
      lastModified: new Date(),
    },
    {
      url: "https://malydetektyw.pl/sklep",
      lastModified: new Date(),
    },
    {
      url: "https://malydetektyw.pl/polityka-prywatnosci",
      lastModified: new Date(),
    },
  ];
}