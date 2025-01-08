"use client";

import dynamic from "next/dynamic";
import IssueFormSkeleton from "../[id]/edit/loading";
import { Issue } from "@prisma/client";

const IssueForm = dynamic(() => import("./IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

export default function IssueFormWrapper({ issue }: { issue: Issue }) {
  return <IssueForm issue={issue} />;
}
