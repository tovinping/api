// 输出例如: "2024/11/03 15:07:16"
export function formatDate(isoString?: string) {
  if (!isoString) return "";
  const date = new Date(isoString);

  const formatter = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const timeString = formatter.format(date);
  return timeString;
}
