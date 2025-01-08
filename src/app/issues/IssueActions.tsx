import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { routes } from "../routes/routes";

const IssueActions = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href={routes.newIssues.href}>{routes.newIssues.label}</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
