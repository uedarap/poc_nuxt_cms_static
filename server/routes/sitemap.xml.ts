type SitemapBlogPost = {
    path: string;
    date?: string;
};

const escapeXml = (value: string) => {
    // Escapa caracteres especiais para manter o XML valido mesmo com URLs futuras mais complexas.
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
};

const normalizeDate = (value?: string) => {
    // Converte a data do frontmatter para YYYY-MM-DD, formato simples aceito em sitemap.
    if (!value) return undefined;

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) return undefined;

    return parsedDate.toISOString().slice(0, 10);
};

export default defineEventHandler(async (event) => {
    // Reaproveita os valores de deploy para gerar URLs absolutas corretas em producao.
    const config = useRuntimeConfig(event);
    const siteUrl = String(config.public.siteUrl || "").replace(/\/$/, "");
    const baseURL = String(config.app.baseURL || "/");
    const basePath = baseURL === "/" ? "" : baseURL.replace(/\/$/, "");

    // Evita duplicar o caminho quando siteUrl ja inclui o subdiretorio publicado.
    const siteRoot = basePath && siteUrl.endsWith(basePath) ? siteUrl : `${siteUrl}${basePath}`;

    // Busca somente posts publicados para evitar expor rascunhos aos mecanismos de busca.
    const blogPosts = await queryCollection("blog")
        .where("draft", "<>", true)
        .select("path", "date")
        .all() as SitemapBlogPost[];

    // Lista rotas fixas e rotas vindas do Content em um unico fluxo para montar o XML.
    const urls: Array<{ loc: string; changefreq: string; priority: string; lastmod?: string }> = [
        { loc: "/", changefreq: "weekly", priority: "1.0" },
        { loc: "/blog", changefreq: "weekly", priority: "0.8" },
        ...blogPosts.map((post) => ({
            loc: post.path,
            lastmod: normalizeDate(post.date),
            changefreq: "monthly",
            priority: "0.7",
        })),
    ];

    // Informa ao navegador/crawler que o retorno e XML e pode ser consumido como sitemap.
    setHeader(event, "content-type", "application/xml; charset=utf-8");

    // Serializa manualmente porque o sitemap e pequeno e a estrutura e controlada pelo projeto.
    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls.map((url) => {
            const absoluteUrl = `${siteRoot}${url.loc === "/" ? "" : url.loc}`;
            const lastmodTag = url.lastmod ? `    <lastmod>${escapeXml(url.lastmod)}</lastmod>\n` : "";

            return [
                "  <url>",
                `    <loc>${escapeXml(absoluteUrl || "/")}</loc>`,
                lastmodTag.trimEnd(),
                `    <changefreq>${url.changefreq}</changefreq>`,
                `    <priority>${url.priority}</priority>`,
                "  </url>",
            ].filter(Boolean).join("\n");
        }),
        "</urlset>",
        "",
    ].join("\n");
});
