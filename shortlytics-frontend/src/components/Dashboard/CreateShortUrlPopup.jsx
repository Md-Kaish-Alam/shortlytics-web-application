import Modal from "@mui/material/Modal";

import CreateShortUrlForm from "./CreateShortUrlForm";

const CreateShortUrlPopup = ({ open, setOpen, refetch }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex justify-center items-center h-full w-full">
        <CreateShortUrlForm setOpen={setOpen} refetch={refetch} />
      </div>
    </Modal>
  );
};

export default CreateShortUrlPopup;
