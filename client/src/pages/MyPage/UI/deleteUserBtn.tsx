import axios from 'axios';

interface DeleteBtnProps {
  id: number;
}

const DeleteUserBtn = ({ id }: DeleteBtnProps) => {
  const deleteUser = async () => {
    try {
      const res = await axios.delete(
        `http://ec2-54-180-85-209.ap-northeast-2.compute.amazonaws.com:8080/members/${id}`
      );
      if (res.status === 200) {
        console.log('user deleted');
      } else {
        console.log('failed to delete user:', res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleBtnClick = () => {
    deleteUser();
  };

  return (
    <div>
      <button className="px-12 py-4" onClick={handleBtnClick}>
        회원 탈퇴
      </button>
    </div>
  );
};

export default DeleteUserBtn;
