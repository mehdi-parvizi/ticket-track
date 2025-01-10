import { Status } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import Pagination from "../components/Pagination";
import IssueActions from "./_components/IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./_components/IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<IssueQuery>;
}) => {
  const { status, orderBy, page } = await searchParams;

  const statuses = Object.values(Status);
  const where = { status: statuses.includes(status) ? status : undefined };

  const pageInit = parseInt(page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    skip: (pageInit - 1) * pageSize,
    take: pageSize,
    orderBy: {
      [orderBy]: columnNames.includes(orderBy) ? "asc" : undefined,
    },
  });

  const issueCount = await prisma.issue.count({
    where,
  });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={pageInit}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ticket Tracker - Issue List",
  description: "View all project issues",
};

export default IssuesPage;
