import { prisma } from "../../../../prisma/client";
import { notFound } from "next/navigation";
import { Box, Button, Card, Grid, Heading, Text } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Heading>{issue.title}</Heading>
        <div className="flex space-x-3 my-2 items-center">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </div>
        <Card className="prose mt-4">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
