import React from "react";
import { useDispatch } from "react-redux";
import { Modal } from "semantic-ui-react";
import { closeModal } from "../../store/actions/modalActions";

function ModalWrapper({ children, size, header }) {
  const dispatch = useDispatch();

  return (
    <Modal
      open={true}
      size={size}
      onClose={() =>
        setTimeout(function () {
          dispatch(closeModal());
        }, 0)
      }
    >
      {header && <Modal.Header>{header}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}

export default ModalWrapper;
