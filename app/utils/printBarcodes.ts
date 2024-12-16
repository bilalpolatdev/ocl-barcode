interface PrintBarcodesProps {
  barcodes: string[];
  viewMode: "single" | "triple";
}

export const printBarcodes = ({ barcodes, viewMode }: PrintBarcodesProps) => {
  // Görünmez iframe oluştur
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  // iframe içeriğini ayarla
  const printContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Barkod Yazdır</title>
        <style>
          body { 
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .container { 
            width: 10cm;
            height: ${viewMode === "single" ? "5cm" : "15cm"};
            page-break-after: always;
          }
          .barcode-single { 
            width: 10cm;
            height: 5cm;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .barcode-triple { 
            width: 10cm;
            height: 15cm;
            display: flex;
            flex-direction: column;
            gap: 0;
          }
          .barcode-item {
            width: 10cm;
            height: 5cm;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
          svg {
            max-width: 9cm;
            max-height: 4.5cm;
            width: auto;
            height: auto;
          }
          @media print {
            @page { 
              size: ${viewMode === "single" ? "10cm 5cm" : "10cm 15cm"};
              margin: 0;
            }
            body { 
              margin: 0;
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        ${
          viewMode === "single"
            ? barcodes
                .map(
                  (data) => `
                  <div class="container">
                    <div class="barcode-single">
                      ${
                        document
                          .getElementById(`barcode-${data}`)
                          ?.querySelector("svg")?.outerHTML || ""
                      }
                    </div>
                  </div>
                `
                )
                .join("")
            : Array.from({ length: Math.ceil(barcodes.length / 3) })
                .map(
                  (_, groupIndex) => `
                  <div class="container">
                    <div class="barcode-triple">
                      ${barcodes
                        .slice(groupIndex * 3, groupIndex * 3 + 3)
                        .map(
                          (data) => `
                        <div class="barcode-item">
                          ${
                            document
                              .getElementById(`barcode-${data}`)
                              ?.querySelector("svg")?.outerHTML || ""
                          }
                        </div>
                      `
                        )
                        .join("")}
                    </div>
                  </div>
                `
                )
                .join("")
        }
        <script>
          window.onload = () => {
            window.print();
            window.onafterprint = () => {
              document.body.parentElement.removeChild(document.body);
            };
          };
        </script>
      </body>
    </html>
  `;

  // iframe içeriğini ayarla ve yazdır
  const iframeDoc = iframe.contentWindow?.document;
  if (iframeDoc) {
    iframeDoc.open();
    iframeDoc.write(printContent);
    iframeDoc.close();
  }

  // Yazdırma tamamlandığında iframe'i kaldır
  iframe.onload = () => {
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };
};
