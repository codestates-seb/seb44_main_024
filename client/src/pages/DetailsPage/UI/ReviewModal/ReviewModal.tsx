import ModalForm from './ModalForm/ModalForm';
import { ReviewContent } from '../../assets/types/movieTypes';

type CloseModalFn = () => void;
export interface ModalProps {
  closeModal: CloseModalFn;
  movieId?: string;
  review?: ReviewContent;
  pageNumber?: string | number;
}

const ReviewModal = ({ closeModal, movieId, review, pageNumber }: ModalProps) => {
  const preventModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      role="presentation"
      onClick={closeModal}
      className="fixed inset-0 z-10 flex items-center justify-center bg-black/40"
    >
      <div
        role="presentation"
        onClick={preventModalClick}
        className="h-[450px] w-[500px] bg-white p-5"
      >
        <ModalForm
          closeModal={closeModal}
          movieId={movieId}
          review={review}
          pageNumber={pageNumber}
        />
      </div>
    </div>
  );
};

export default ReviewModal;
