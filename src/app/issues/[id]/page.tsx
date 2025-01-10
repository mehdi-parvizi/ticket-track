import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { prisma } from "../../../../prisma/client";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteButton from "./DeleteButton";
import UpdateStatus from "./UpdateStatus";
import { auth } from "@/app/auth";
import AssigneeSelect from "./AssigneeSelect";
interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const session = await auth();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session?.user && (
        <Flex gap="4" direction="column">
          <AssigneeSelect
            issueId={issue.id}
            assigneeId={issue.assignedToUserId}
          />
          <EditIssueButton issueId={issue.id} />
          <DeleteButton issueId={issue.id} />
          <UpdateStatus issueId={issue.id} />
        </Flex>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export default IssueDetailPage;
