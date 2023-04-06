import Modal, { ModalProps } from "./Modal";
import Button from "../../common/Button";
import { Recipe } from "@/types";
import { useRouter } from "next/navigation";

interface SuccessModalProps extends ModalProps {
  recipeId: string;
  recipeTitle: string;
}

export default function CategoriesModal({
  recipeId,
  recipeTitle,
  isModalOpen,
  setIsModalOpen,
}: SuccessModalProps) {
  const router = useRouter();

  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} className="p-4 w-80">
      <h2 className="font-semibold text-xl text-center">
        {recipeTitle === "" ? "Unnamed" : recipeTitle} recipe was successefully created!
      </h2>
      <p className="max-w-[250px] text-center mx-auto mt-4">
        Your recipe was created! Now you can check it out or create another recipe
      </p>
      <div className="flex justify-between px-2 mt-4">
        <Button onClick={() => router.push("/recipes/" + recipeId)}>Go to recipe</Button>
        <Button onClick={() => setIsModalOpen(false)}>Create another</Button>
      </div>
    </Modal>
  );
}
