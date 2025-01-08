"use client";
import { ENDPOINTS } from "@/app/routes/endpoints";
import { routes } from "@/app/routes/routes";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();

  const handleDelete = async () => {
    await axios.delete(ENDPOINTS.ISSUE + "/" + issueId);
    router.push(routes.issues.href);
  };

  return (
    <Button onClick={handleDelete} color="red">
      Delete
    </Button>
  );
};

export default DeleteButton;
