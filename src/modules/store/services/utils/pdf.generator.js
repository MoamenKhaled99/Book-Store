import PDFDocument from "pdfkit";

async function generatePDF(store, top5Books, top5Authors) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const chunks = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // Header with Store Logo and Name
      if (store.logo) {
        try {
          // If logo is a URL or base64, you might want to fetch it
          // For now, we'll just display the store name prominently
          doc.fontSize(24).font("Helvetica-Bold").text(store.name, { align: "center" });
        } catch (err) {
          doc.fontSize(24).font("Helvetica-Bold").text(store.name, { align: "center" });
        }
      } else {
        doc.fontSize(24).font("Helvetica-Bold").text(store.name, { align: "center" });
      }

      doc.moveDown();
      doc.fontSize(12).font("Helvetica").text(`Address: ${store.address}`, { align: "center" });
      doc.moveDown(2);

      // Top 5 Priciest Books Section
      doc.fontSize(18).font("Helvetica-Bold").text("Top 5 Priciest Books", { underline: true });
      doc.moveDown();

      if (top5Books.length === 0) {
        doc.fontSize(12).font("Helvetica").text("No books available in inventory.");
      } else {
        doc.fontSize(11).font("Helvetica-Bold");
        doc.text("Rank", 50, doc.y, { continued: true, width: 50 });
        doc.text("Book Name", 100, doc.y, { continued: true, width: 200 });
        doc.text("Author", 300, doc.y, { continued: true, width: 150 });
        doc.text("Price", 450, doc.y, { width: 100 });
        doc.moveDown(0.5);

        doc.fontSize(10).font("Helvetica");
        top5Books.forEach((book, index) => {
          doc.text(`${index + 1}`, 50, doc.y, { continued: true, width: 50 });
          doc.text(book.name, 100, doc.y, { continued: true, width: 200 });
          doc.text(book.author, 300, doc.y, { continued: true, width: 150 });
          doc.text(`$${book.price.toFixed(2)}`, 450, doc.y, { width: 100 });
          doc.moveDown(0.5);
        });
      }

      doc.moveDown(2);

      // Top 5 Prolific Authors Section
      doc.fontSize(18).font("Helvetica-Bold").text("Top 5 Prolific Authors", { underline: true });
      doc.moveDown();

      if (top5Authors.length === 0) {
        doc.fontSize(12).font("Helvetica").text("No authors available in inventory.");
      } else {
        doc.fontSize(11).font("Helvetica-Bold");
        doc.text("Rank", 50, doc.y, { continued: true, width: 50 });
        doc.text("Author Name", 100, doc.y, { continued: true, width: 300 });
        doc.text("Book Count", 400, doc.y, { width: 150 });
        doc.moveDown(0.5);

        doc.fontSize(10).font("Helvetica");
        top5Authors.forEach((author, index) => {
          doc.text(`${index + 1}`, 50, doc.y, { continued: true, width: 50 });
          doc.text(author.name, 100, doc.y, { continued: true, width: 300 });
          doc.text(author.bookCount.toString(), 400, doc.y, { width: 150 });
          doc.moveDown(0.5);
        });
      }

      // Footer
      doc.moveDown(3);
      doc.fontSize(10).font("Helvetica-Oblique").text(
        `Report generated on ${new Date().toLocaleDateString()}`,
        { align: "center" }
      );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

export { generatePDF };
