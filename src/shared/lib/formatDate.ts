export function formatDate(dateStr: string | null | undefined): string {
  return dateStr ? new Date(dateStr).toLocaleDateString('ru-RU') : '—'
}
