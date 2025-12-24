import csvParser from "csv-parser";
import { Readable } from "stream";

async function parseCSV(csvData) {
  return new Promise((resolve, reject) => {
    const results = [];
    const stream = Readable.from([csvData]);

    stream
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

export { parseCSV };
