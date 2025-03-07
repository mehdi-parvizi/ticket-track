import { prisma } from "../../prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import { IssueStatusBadge } from "./components";
import { routes } from "./routes/routes";
import Link from "next/link";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { assignedToUser: true },
  });
  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex align="center" gap="2">
                    <Link href={routes.issues.href + issue.id}>
                      {issue.title}
                    </Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser ? (
                    <Avatar
                      size="2"
                      radius="full"
                      src={issue.assignedToUser.image!}
                      fallback="?"
                    />
                  ) : (
                    <Avatar size="2" radius="full" src={""} fallback="U" />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
