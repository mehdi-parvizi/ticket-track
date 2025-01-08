import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { prisma } from "../../../../prisma/client";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteButton from "./DeleteButton";
import UpdateStatus from "./UpdateStatus";
interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Flex gap="4" direction="column">
        <EditIssueButton issueId={issue.id} />
        <DeleteButton issueId={issue.id} />
        <UpdateStatus issueId={issue.id} />
      </Flex>
    </Grid>
  );
};

export default IssueDetailPage;
