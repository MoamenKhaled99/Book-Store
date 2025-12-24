import dayjs from "dayjs";

function formatStoreId(storeId) {
  return parseInt(storeId, 10);
}

function formatStoreName(name) {
  return name.trim().replace(/[^a-zA-Z0-9]/g, "-");
}

function formatReportDate() {
  return dayjs().format("YYYY-MM-DD");
}

function formatReportFilename(storeName) {
  const sanitizedName = formatStoreName(storeName);
  const date = formatReportDate();
  return `${sanitizedName}-Report-${date}.pdf`;
}

export { formatStoreId, formatStoreName, formatReportDate, formatReportFilename };
