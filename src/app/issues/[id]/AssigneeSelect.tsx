"use client";
import { ENDPOINTS } from "@/app/routes/endpoints";
import { User } from "@prisma/client";

import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components/index";

const AssigneeSelect = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get(ENDPOINTS.USERS).then((res) => res.data),
    staleTime: 60 * 1000, //60s,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  if (error) return null;

  if (isLoading) return <Skeleton />;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
