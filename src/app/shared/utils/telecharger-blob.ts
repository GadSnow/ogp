/** Déclenche le téléchargement d'un Blob (réponse HttpClient) sans navigation, via une ancre volatile. */
export function telechargerBlob(blob: Blob, nomFichier: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nomFichier;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
}
