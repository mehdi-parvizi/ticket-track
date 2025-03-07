"use client";
import { ENDPOINTS } from "@/app/routes/endpoints";
import { User } from "@prisma/client";
import toast, { Toaster } from "react-hot-toast";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components/index";

interface Props {
  issueId: number | null;
  assigneeId: string | null;
}

const AssigneeSelect = ({ issueId, assigneeId }: Props) => {
  const { data: users, error, isLoading } = useUsers();

  if (error) return null;

  if (isLoading) return <Skeleton />;

  const handleIssueAssignment = async (userId: string) => {
    try {
      await axios.patch(ENDPOINTS.ISSUE + issueId, {
        assignedToUserId: userId === "unassigned" ? null : userId,
      });
    } catch {
      toast.error("Changes could not be saved");
    }
  };

  return (
    <>
      <Select.Root
        defaultValue={assigneeId ?? "unassigned"}
        onValueChange={handleIssueAssignment}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Item value={"unassigned"}>Unassigned</Select.Item>
            <Select.Separator />
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get(ENDPOINTS.USERS).then((res) => res.data),
    staleTime: 60 * 10 * 1000, //10min,
    retry: 2,
    refetchOnWindowFocus: false,
  });

export default AssigneeSelect;
