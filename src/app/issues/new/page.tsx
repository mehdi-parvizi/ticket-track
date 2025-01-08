"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { routes } from "@/app/utils/routes";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/schema/validationSchemas";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  return (
    <div className="max-w-xl mb-5">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            setError("");
            router.push(routes.issues.href);
          } catch {
            setError("An unexpected error occured");
          }
        })}
        className="max-w-xl space-y-3"
      >
        <div className="h-10 text-sm flex flex-col">
          <TextField.Root {...register("title")} placeholder="Title" />
          {errors.title && (
            <Text as="p" className="ml-1" color="red">
              {errors.title.message}
            </Text>
          )}
        </div>
        <div className="max-h-[28rem] text-sm flex flex-col">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          {errors.description && (
            <Text as="p" color="red">
              {errors.description.message}
            </Text>
          )}
        </div>
        <Button>Submit new issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
