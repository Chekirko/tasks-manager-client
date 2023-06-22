import { useState } from 'react';
import MyModal from '../modal/MyModal';
import UpdateCategoryForm from '../UpdateCategoryForm/UpdateCategoryForm';
import DeleteCategoryCard from '../DeleteCategoryCard/DeleteCategoryCard';

interface ActionCardProps {
  closeModal: () => void;
  id: number;
}

const ActionCard: React.FC<ActionCardProps> = ({ closeModal, id }: ActionCardProps) => {
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  return (
    <>
      <p>What would you like to do with this category?</p>

      <button onClick={() => setModalUpdate(true)}>Update</button>
      <MyModal visible={modalUpdate} setVisible={setModalUpdate}>
        <UpdateCategoryForm closeModal={closeModal} id={id}></UpdateCategoryForm>
      </MyModal>

      <button onClick={() => setModalDelete(true)}>Delete</button>
      <MyModal visible={modalDelete} setVisible={setModalDelete}>
        <DeleteCategoryCard closeModal={closeModal} categoryId={id}></DeleteCategoryCard>
      </MyModal>
    </>
  );
};

export default ActionCard;
