import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePatient } from "@/modules/patient/hooks/use-patient";
import { PatientSex, type Patient } from "@/modules/patient/types/patient";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@radix-ui/react-select";
import { EditIcon, Loader2 } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface EditPatientActionProps {
  patient: Patient;
}

const formSchema = z.object({
  givenName: z.string().min(2, {
    message: "Given name must be at least 2 characters.",
  }),
  familyName: z.string().min(2, {
    message: "Family name must be at least 2 characters.",
  }),
  sex: z.enum([PatientSex.MALE, PatientSex.FEMALE]),
});

type FormSchemaType = z.infer<typeof formSchema>;

export const EditPatientAction = ({ patient }: EditPatientActionProps) => {
  const {
    handlers: { handleUpdatePatient },
    loading,
  } = usePatient();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      givenName: patient.givenName,
      familyName: patient.familyName,
      sex: patient.sex as PatientSex,
    },
  });

  const handleSubmitForm = useCallback(
    (data: FormSchemaType) => {
      handleUpdatePatient({
        props: {
          familyName: data.familyName,
          givenName: data.givenName,
          sex: data.sex,
        },
        onSuccess: () => {
          form.reset();
          const dialogTrigger = document.querySelector('[data-state="open"]');
          if (dialogTrigger) {
            (dialogTrigger as HTMLElement).click();
          }
        },
      });
    },
    [handleUpdatePatient],
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <EditIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Patient</DialogTitle>
          <DialogDescription>Edit patient information</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-4"
        >
          <div className="my-4 flex w-full flex-col gap-4 space-y-4">
            <div className="flex flex-col gap-2">
              <Label>Given Name</Label>
              <Input
                type="text"
                {...form.register("givenName")}
                placeholder={patient.givenName}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Family Name</Label>
              <Input
                type="text"
                {...form.register("familyName")}
                placeholder={patient.familyName}
              />
            </div>

            <div className="flex w-full flex-row justify-between gap-2">
              <div className="flex w-full flex-col gap-2">
                <Label>Sex</Label>
                <Select
                  value={form.watch("sex")}
                  onValueChange={(value) =>
                    form.setValue("sex", value as PatientSex)
                  }
                  defaultValue={patient.sex as PatientSex}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={patient.sex as PatientSex} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PatientSex.MALE}>Male</SelectItem>
                    <SelectItem value={PatientSex.FEMALE}>Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="flex flex-row gap-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <div className="flex flex-row items-center gap-1">
                    <Loader2 className="h-4 w-4 animate-spin" /> Updating...
                  </div>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
