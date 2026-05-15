// Centraliza a montagem de URLs para arquivos em public/, respeitando o baseURL do GitHub Pages.
export const usePublicAsset = () => {
    const config = useRuntimeConfig()
    const baseURL = config.app.baseURL || '/'

    // Normaliza caminhos vindos de Markdown, templates ou dados legados antes de prefixar o baseURL.
    return (path: string) => {
        if (/^(https?:|data:|mailto:|tel:)/.test(path) || path.startsWith(baseURL)) return path

        const normalizedPath = path.replace(/^\.\//, '').replace(/^\//, '')

        return `${baseURL}${normalizedPath}`
    }
}
