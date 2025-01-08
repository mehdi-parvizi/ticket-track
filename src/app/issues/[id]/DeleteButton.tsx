"use client";
import { ENDPOINTS } from "@/app/routes/endpoints";
import { routes } from "@/app/routes/routes";
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteButton = ({ issueId }: { issueId: number }) => {
  const [isError, setIsError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(ENDPOINTS.ISSUE + issueId);
      router.push(routes.issues.href);
      router.refresh();
    } catch {
      setIsDeleting(false);
      setIsError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={isDeleting} color="red">
            {isDeleting ? <Spinner /> : "Delete"}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action can not be
            undone
          </AlertDialog.Description>
          <Flex mt="4" gap="3" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                onClick={handleDelete}
                disabled={isDeleting}
                variant="solid"
                color="red"
              >
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={isError}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted
          </AlertDialog.Description>
          <Button
            mt="2"
            variant="soft"
            onClick={() => setIsError(false)}
            color="gray"
          >
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteButton;
