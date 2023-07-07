type CloseModalFn = () => void;
interface CloseModalProps {
  closeModal: CloseModalFn;
}

const CreateReviewModal = ({ closeModal }: CloseModalProps) => {
  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 flex items-center justify-center bg-black/40"
    >
      <div className="h-96 w-96 bg-white">하하</div>
    </div>
  );
};

export default CreateReviewModal;
