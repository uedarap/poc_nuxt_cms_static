export default defineEventHandler((event) => {
    // Monta as URLs absolutas a partir do mesmo runtime config usado pelas paginas.
    const config = useRuntimeConfig(event);
    const siteUrl = String(config.public.siteUrl || "").replace(/\/$/, "");
    const baseURL = String(config.app.baseURL || "/");
    const basePath = baseURL === "/" ? "" : baseURL.replace(/\/$/, "");

    // Evita duplicar o caminho quando siteUrl ja aponta para o subdiretorio do deploy.
    const siteRoot = basePath && siteUrl.endsWith(basePath) ? siteUrl : `${siteUrl}${basePath}`;
    const sitemapUrl = `${siteRoot}/sitemap.xml`;

    // Informa ao crawler que o retorno e texto puro, como esperado para robots.txt.
    setHeader(event, "content-type", "text/plain; charset=utf-8");

    // Permite indexacao geral e aponta o Google para o sitemap gerado no build.
    return [
        "User-agent: *",
        "Allow: /",
        "",
        `Sitemap: ${sitemapUrl}`,
        "",
    ].join("\n");
});
