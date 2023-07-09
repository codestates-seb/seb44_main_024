import ModalForm from './ModalForm/ModalForm';

type CloseModalFn = () => void;
interface CloseModalProps {
  closeModal: CloseModalFn;
  movieId: string | undefined;
}

const CreateReviewModal = ({ closeModal, movieId }: CloseModalProps) => {
  const preventModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  return (
    <div
      role="presentation"
      onClick={closeModal}
      className="fixed inset-0 flex items-center justify-center bg-black/40"
    >
      <div
        role="presentation"
        onClick={preventModalClick}
        className="h-[450px] w-[500px] bg-white p-7"
      >
        <ModalForm movieId={movieId} />
      </div>
    </div>
  );
};

export default CreateReviewModal;
