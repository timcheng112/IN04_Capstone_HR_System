import React from "react";
import { Modal, Portal, Title } from "react-native-paper";
import PDFReader from "rn-pdf-reader-js-improved";

const ViewPayslipModal = ({ visible, hideModal, pdfUri }) => {
  const containerStyle = {
    backgroundColor: "white",
    padding: 10,
    height: "98%",
    width: "96%",
    alignSelf: "center",
    borderRadius: 20,
  };
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <PDFReader
          customStyle={{
            readerContainer: { backgroundColor: "white", width: "100%" },
            readerContainerNumbers: { backgroundColor: "white", color: "black" },
            readerContainerNumbersContent: { backgroundColor: "#818cf8", },
          }}
          withPinchZoom
          source={{
            uri: pdfUri,
          }}
        />
      </Modal>
    </Portal>
  );
};

export default ViewPayslipModal;
