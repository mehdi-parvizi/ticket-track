import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { routes } from "../routes/routes";

const IssuesPage = () => {
  return (
    <>
      <Button>
        <Link href={routes.newIssues.href}>{routes.newIssues.label}</Link>
      </Button>
    </>
  );
};

export default IssuesPage;
