import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { routes } from "../routes/routes";
import StatusFilter from "./StatusFilter";

const IssueActions = () => {
  return (
    <div className="mb-5 flex justify-end gap-5">
      <StatusFilter />
      <Button>
        <Link href={routes.newIssues.href}>{routes.newIssues.label}</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
