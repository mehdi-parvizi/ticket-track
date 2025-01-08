"use client";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { routes } from "@/app/routes/routes";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/schema/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import { ENDPOINTS } from "@/app/routes/endpoints";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (issue) await axios.patch(ENDPOINTS.ISSUE + "/" + issue.id, data);
      else await axios.post(ENDPOINTS.ISSUE, data);
      setError("");
      router.push(routes.issues.href);
    } catch {
      setError("An unexpected error occured");
    }
  });

  return (
    <div className="max-w-xl mb-5">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className="max-w-xl space-y-3">
        <div className="h-10 text-sm flex flex-col">
          <TextField.Root
            {...register("title")}
            defaultValue={issue?.title}
            placeholder="Title"
          />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>
        <div className="max-h-[28rem] text-sm flex flex-col">
          <Controller
            name="description"
            control={control}
            defaultValue={issue?.description}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>
        <Button disabled={isSubmitting}>
          {isSubmitting ? (
            <Spinner />
          ) : issue ? (
            "Update issue"
          ) : (
            "Submit new issue"
          )}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
