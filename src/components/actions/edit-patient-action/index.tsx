import { Button } from "@/components/ui/button";
import { DialogComponent } from "@/components/ui/components/dialog-component";
import { SelectComponent } from "@/components/ui/components/select-component";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePatient } from "@/modules/patient/hooks/use-patient";
import { PatientSex, type Patient } from "@/modules/patient/types";
import { dateStringToDate, dateToDateString } from "@/utils/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon, Loader2 } from "lucide-react";
import { useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

interface EditPatientActionProps {
  patient: Patient;
  onPatientUpdated?: () => void;
}

const formSchema = z.object({
  givenName: z.string().min(2, {
    message: "Given name must be at least 2 characters.",
  }),
  familyName: z.string().min(2, {
    message: "Family name must be at least 2 characters.",
  }),
  sex: z.enum([PatientSex.MALE, PatientSex.FEMALE]),
  birthDate: z.date(),
});

type FormSchemaType = z.infer<typeof formSchema>;

export const EditPatientAction = ({
  patient,
  onPatientUpdated,
}: EditPatientActionProps) => {
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
      birthDate: dateStringToDate(patient.birthDate), // Usando função utilitária
    },
  });

  const editPatientDialogTrigger = useMemo(() => {
    return (
      <Button variant="outline" size="sm">
        <EditIcon className="h-4 w-4" />
      </Button>
    );
  }, []);

  const sexSelectItems = useMemo(() => {
    return [
      { value: PatientSex.MALE, label: "Male" },
      { value: PatientSex.FEMALE, label: "Female" },
    ];
  }, []);

  const onSexSelectValueChange = useCallback(
    (value: string) => {
      form.setValue("sex", value as PatientSex);
    },
    [form],
  );

  const editPatientDialogContent = useMemo(() => {
    return (
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

        <div className="flex w-full flex-col justify-between gap-8 md:flex-row md:gap-2">
          <div className="flex w-full flex-col gap-2">
            <Label>Sex</Label>
            <SelectComponent
              value={form.watch("sex")}
              onValueChange={onSexSelectValueChange}
              defaultValue={patient.sex as PatientSex}
              placeholder={patient.sex as PatientSex}
              triggerClassName="w-full"
              items={sexSelectItems}
            />
          </div>

          <div className="flex w-full flex-col gap-2">
            <Label>Birth Date</Label>
            <Controller
              name="birthDate"
              control={form.control}
              render={({ field }) => (
                <Input
                  type="date"
                  value={
                    field.value instanceof Date
                      ? dateToDateString(field.value)
                      : ""
                  }
                  onChange={(e) => {
                    if (e.target.value) {
                      field.onChange(new Date(e.target.value));
                    }
                  }}
                  onBlur={field.onBlur}
                  max={new Date().toISOString().split("T")[0]}
                />
              )}
            />
          </div>
        </div>
      </div>
    );
  }, [form, patient, sexSelectItems, onSexSelectValueChange, form.control]);

  const handleSubmitFormOnClick = useCallback(() => {
    form.handleSubmit((data: FormSchemaType) => {
      const updateData = {
        id: patient.id,
        familyName: data.familyName,
        givenName: data.givenName,
        sex: data.sex,
        birthDate: dateToDateString(data.birthDate), // Usando função utilitária
      };

      handleUpdatePatient({
        props: updateData,
        onSuccess: () => {
          form.reset();
          const dialogTrigger = document.querySelector('[data-state="open"]');
          if (dialogTrigger) (dialogTrigger as HTMLElement).click();

          onPatientUpdated && onPatientUpdated();
        },
      });
    })();
  }, [form, handleUpdatePatient, onPatientUpdated, patient.id]);

  const editPatientDialogFooter = useMemo(() => {
    return (
      <div className="flex w-full flex-col justify-center gap-2">
        <Button
          type="submit"
          disabled={loading}
          onClick={handleSubmitFormOnClick}
        >
          {loading ? (
            <div className="flex flex-row items-center gap-1">
              <Loader2 className="h-4 w-4 animate-spin" /> Updating...
            </div>
          ) : (
            "Update"
          )}
        </Button>
      </div>
    );
  }, [loading, handleSubmitFormOnClick]);

  return (
    <DialogComponent
      dialogContentClassName="lg:min-w-2xl"
      dialogFooterClassName="lg:flex-row lg:gap-2 md:flex-col-reverse md:gap-2"
      trigger={editPatientDialogTrigger}
      title="Edit Patient"
      description="Edit patient information"
      children={editPatientDialogContent}
      footer={editPatientDialogFooter}
      closeButton={
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Cancel
          </Button>
        </DialogClose>
      }
    />
  );
};
