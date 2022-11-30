import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

const url =
  "https://cors-anywhere.herokuapp.com/http://www.pdf995.com/samples/pdf.pdf";

export default function PayslipDocumentUrl({ url }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  // /*To Prevent right click on screen*/
  // document.addEventListener("contextmenu", (event) => {
  //   event.preventDefault();
  // });

  // /*When document gets loaded successfully*/
  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  //   setPageNumber(1);
  // }

  // function changePage(offset) {
  //   setPageNumber((prevPageNumber) => prevPageNumber + offset);
  // }

  // function previousPage() {
  //   changePage(-1);
  // }

  // function nextPage() {
  //   changePage(1);
  // }
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <nav
        style={{
          display: "flex",
          margin: "auto",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={goToPrevPage}
          style={{
            backgroundColor: "#cbd5e1",
            padding: 12,
            borderRadius: 20,
            margin: 10,
          }}
        >
          Prev
        </button>
        <button
          onClick={goToNextPage}
          style={{
            backgroundColor: "#a5b4fc",
            padding: 12,
            borderRadius: 20,
            margin: 10,
          }}
        >
          Next
        </button>
        <p
          style={{
            backgroundColor: "#cbd5e1",
            padding: 12,
            borderRadius: 20,
            margin: 10,
          }}
        >
          Page {pageNumber} of {numPages}
        </p>
      </nav>

      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  );
}
