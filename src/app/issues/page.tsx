import { Table } from "@radix-ui/themes";
import { prisma } from "../../../prisma/client";
import { IssueStatusBadge, Link } from "@/app/components";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import IssueActions from "./_components/IssueActions";
import { ArrowUpIcon } from "@radix-ui/react-icons";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue }>;
}) => {
  const { status, orderBy } = await searchParams;
  const statuses = Object.values(Status);

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Created At",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  const issues = await prisma.issue.findMany({
    where: { status: statuses.includes(status) ? status : undefined },
    orderBy: {
      [orderBy]: columns.map((col) => col.value).includes(orderBy)
        ? "asc"
        : undefined,
    },
  });
  return (
    <>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink href={{ query: { status, orderBy: column.value } }}>
                  {column.label}
                </NextLink>
                {column.value === orderBy && <ArrowUpIcon className="inline" />}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
