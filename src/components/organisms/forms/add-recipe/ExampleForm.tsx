import { Form, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { extractHostname } from "@/utils";
import { useMutationCreateOrUpdateHost } from "@/hooks/hosts/useMutationCreateOrUpdateHost";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ControlledFormInput } from "./inputs/ControlledFormInput";
import { FaX } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const titleElementsXpathschema = z.object({
  name: z.string().min(1, "Name is required"),
  xpath: z.string().min(1, "XPath is required"),
});

const setupHostSchema = z.object({
  hostName: z.string().min(1, "Host name is required"),
  hostUrl: z.string(),
  imgXpath: z.string().min(1, "Image XPath is required"),
  downloadPath: z.string().optional(),
  nameOverride: z.string().optional(),
  titleElementsXpaths: z.array(titleElementsXpathschema),
});

export type HostSetup = z.infer<typeof setupHostSchema>;

interface SetupHostFormProps extends Partial<HostSetup> {
  onSuccess: () => void;
}

export const SetupHostForm = ({
  hostUrl,
  hostName,
  imgXpath,
  titleElementsXpaths,
  downloadPath,
  nameOverride,
  onSuccess,
}: SetupHostFormProps) => {
  const { mutate: saveHost, isSuccess } = useMutationCreateOrUpdateHost();
  const client = useQueryClient();
  const form = useForm<HostSetup>({
    resolver: zodResolver(setupHostSchema),
    defaultValues: {
      hostName: hostName ?? extractHostname(hostUrl),
      hostUrl: extractHostname(hostUrl) ?? "",
      imgXpath: imgXpath ?? "",
      downloadPath: downloadPath ?? "",
      nameOverride: nameOverride ?? "",
      titleElementsXpaths: titleElementsXpaths ?? [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "titleElementsXpaths",
    control: form.control,
  });

  const onSubmit = (data: HostSetup) => {
    console.log(data);
    saveHost(data);
  };

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
      client.refetchQueries();
    }
  }, [isSuccess, hostUrl, onSuccess, client]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col max-h-full w-full gap-4 text-white"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <ControlledFormInput
          control={form.control}
          name="imgXpath"
          label="Image Xpath"
          placeholder="Xpath to image to be downloaded"
        />
        <ControlledFormInput
          control={form.control}
          name="nameOverride"
          label="Image Xpath"
          placeholder="Name that will replace the host name in initial folder"
        />
        <ControlledFormInput
          control={form.control}
          name="downloadPath"
          label="Folder Name Xpath"
          placeholder="this will be used to create a nested folder for the download"
        />
        <FormLabel>Title Elements XPaths:</FormLabel>
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            name={`titleElementsXpaths.${index}`}
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <div className="w-full items-center flex justify-between">
                  <FormLabel>Element {index + 1}</FormLabel>
                  <FaX
                    role="button"
                    className="h-3 w-3"
                    onClick={() => remove(index)}
                  />
                </div>
                <FormControl>
                  <Input
                    placeholder="Variable Name"
                    value={field.value.name}
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        name: e.currentTarget.value,
                      })
                    }
                    onBlur={field.onBlur}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    placeholder="XPath"
                    value={field.value.xpath}
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        xpath: e.currentTarget.value,
                      })
                    }
                    onBlur={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="flex flex-col gap-4">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => append({ name: "", xpath: "" })}
          >
            Add XPath
          </Button>
          <Button variant={"secondary"} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
