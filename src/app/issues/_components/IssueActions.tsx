import { Button } from "@radix-ui/themes";
import Link from "next/link";
import StatusFilter from "./StatusFilter";
import { routes } from "@/app/routes/routes";

const IssueActions = () => {
  return (
    <div className="flex justify-end gap-5">
      <StatusFilter />
      <Button>
        <Link href={routes.newIssues.href}>{routes.newIssues.label}</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
