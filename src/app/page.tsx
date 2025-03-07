import { Flex, Grid } from "@radix-ui/themes";
import { prisma } from "../../prisma/client";
import IssueChart from "./IssueChart";
import IssuesSummary from "./IssuesSummary";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex gap="5" direction="column">
        <IssuesSummary status={{ inProgress, open, closed }} />{" "}
        <IssueChart status={{ inProgress, open, closed }} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Ticket Tracker - Dashboard",
  description: "View a summary of project issues",
};
