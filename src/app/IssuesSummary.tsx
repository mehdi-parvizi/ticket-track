import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { routes } from "./routes/routes";

interface Data {
  open: number;
  inProgress: number;
  closed: number;
}

interface Props {
  status: Data;
}

const IssuesSummary = ({ status: { open, closed, inProgress } }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`${routes.issues.href}?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssuesSummary;
