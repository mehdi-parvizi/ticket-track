"use client";
import Dropdown from "@/app/components/Dropdown";
import { ENDPOINTS } from "@/app/routes/endpoints";
import { routes } from "@/app/routes/routes";
import { Status } from "@prisma/client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UpdateStatus = ({ issueId }: { issueId: number }) => {
  const [value, setValue] = useState<Status | null>(null);
  const router = useRouter();
  const options = [
    { lable: "Open", value: Status.OPEN },
    { lable: "In Progress", value: Status.IN_PROGRESS },
    { lable: "Closed", value: Status.CLOSED },
  ];

  const handleUpdate = async () => {
    if (value) {
      await axios.put(ENDPOINTS.ISSUE + issueId, { status: value });
      router.push(routes.issues.href);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="indigo">Update Status</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Update</AlertDialog.Title>
        <AlertDialog.Description className="flex items-center gap-2">
          Update status to{" "}
          <Dropdown
            lable="Status"
            onValueSelect={(value) => setValue(value)}
            options={options}
            value={value}
          />
        </AlertDialog.Description>
        <Flex mt="4" gap="3" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" onClick={() => setValue(null)}>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button onClick={handleUpdate} variant="solid" color="cyan">
              Update
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default UpdateStatus;
