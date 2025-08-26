import { Button } from "@/components/ui/button";
import { DialogComponent } from "@/components/ui/components/dialog-component";
import { SelectComponent } from "@/components/ui/components/select-component";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { usePatient } from "@/modules/patient/hooks/use-patient";
import { PatientSex } from "@/modules/patient/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusIcon, Trash2Icon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AddPatientActionProps {
  onPatientAdded?: () => void;
  loading?: boolean;
}

interface ParameterType {
  id: number;
  parameterName: string;
  value: number;
  alarm: boolean;
}

const formSchema = z.object({
  givenName: z.string().min(2, {
    message: "Given name must be at least 2 characters.",
  }),
  familyName: z.string().min(2, {
    message: "Family name must be at least 2 characters.",
  }),
  sex: z.enum([PatientSex.MALE, PatientSex.FEMALE]),
  birthDate: z.string(),
});

type FormSchemaType = z.infer<typeof formSchema>;

export const AddPatientAction = ({
  onPatientAdded,
  loading: externalLoading,
}: AddPatientActionProps) => {
  const {
    handlers: { handleAddPatient },
    loading: internalLoading,
  } = usePatient();

  const loading = externalLoading || internalLoading;

  const [parameters, setParameters] = useState<ParameterType[]>([]);
  const [selectedSex, setSelectedSex] = useState<string>("");

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      givenName: "",
      familyName: "",
      sex: undefined as any,
      birthDate: new Date().toISOString().split("T")[0],
    },
  });

  const addPatientDialogTrigger = useMemo(() => {
    if (loading) {
      return (
        <div className="flex w-full flex-row gap-2 md:max-w-fit lg:justify-end">
          <Skeleton className="h-9 w-full md:w-32" />
        </div>
      );
    }

    return (
      <Button
        size="sm"
        className="flex w-full flex-row gap-2 md:max-w-fit lg:justify-end"
      >
        <PlusIcon className="h-4 w-4" />
        <span className="md:hidden xl:block">Add Patient</span>
      </Button>
    );
  }, [loading]);

  const sexSelectItems = useMemo(() => {
    return [
      { value: PatientSex.MALE, label: "Male" },
      { value: PatientSex.FEMALE, label: "Female" },
    ];
  }, []);

  const alarmSelectItems = useMemo(() => {
    return [
      { value: "true", label: "Yes" },
      { value: "false", label: "No" },
    ];
  }, []);

  const onSexSelectValueChange = useCallback(
    (value: string) => {
      setSelectedSex(value);
      form.setValue("sex", value as PatientSex);
    },
    [form],
  );

  const addParameter = useCallback(() => {
    const newParameter: ParameterType = {
      id: Date.now(),
      parameterName: "",
      value: 0,
      alarm: false,
    };
    setParameters((prev) => [...prev, newParameter]);
  }, []);

  const removeParameter = useCallback((id: number) => {
    setParameters((prev) => prev.filter((param) => param.id !== id));
  }, []);

  const updateParameter = useCallback(
    (id: number, field: keyof ParameterType, value: any) => {
      setParameters((prev) =>
        prev.map((param) =>
          param.id === id ? { ...param, [field]: value } : param,
        ),
      );
    },
    [],
  );

  const handleSubmitForm = useCallback(
    (data: FormSchemaType) => {
      handleAddPatient({
        props: {
          familyName: data.familyName,
          givenName: data.givenName,
          sex: data.sex,
          birthDate: data.birthDate,
          id: Math.floor(Math.random() * 100),
          parameters: parameters.map((param) => ({
            id: Math.floor(Math.random() * 100),
            name: param.parameterName,
            value: param.value,
            alarm: param.alarm,
          })),
        },
        onSuccess: () => {
          form.reset();
          setParameters([]);
          setSelectedSex("");
          const dialogTrigger = document.querySelector('[data-state="open"]');
          if (dialogTrigger) (dialogTrigger as HTMLElement).click();

          onPatientAdded && onPatientAdded();
        },
      });
    },
    [form, handleAddPatient, onPatientAdded, parameters],
  );

  const addPatientDialogContent = useMemo(() => {
    return (
      <div className="my-4 flex max-h-96 w-full flex-col gap-2 space-y-4 overflow-y-auto lg:min-h-[500px] lg:gap-4">
        <div className="flex flex-col gap-2">
          <Label>Given Name</Label>
          <Input
            type="text"
            {...form.register("givenName")}
            placeholder="Given Name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Family Name</Label>
          <Input
            type="text"
            {...form.register("familyName")}
            placeholder="Family Name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Birth Date</Label>
          <div className="relative w-full">
            <Input
              type="date"
              {...form.register("birthDate")}
              className="min-h-[36px] w-full text-base"
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="flex w-full flex-row justify-between gap-2">
          <div className="flex w-full flex-col gap-2">
            <Label>Sex</Label>
            <SelectComponent
              value={selectedSex}
              onValueChange={onSexSelectValueChange}
              defaultValue=""
              placeholder="Sex"
              triggerClassName="w-full"
              items={sexSelectItems}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label>Parameters</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addParameter}
            >
              <PlusIcon className="mr-1 h-4 w-4" />
              Add Parameter
            </Button>
          </div>

          <div className="flex max-h-40 flex-col gap-2 overflow-y-auto lg:max-h-80">
            {parameters.map((parameter, index) => (
              <div
                key={parameter.id}
                className="flex flex-col gap-2 rounded-md border p-3"
              >
                <div className="flex items-center justify-between">
                  <Label>Parameter {index + 1}</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeParameter(parameter.id)}
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col gap-2">
                    <Label className="text-xs">Name</Label>
                    <Input
                      type="text"
                      value={parameter.parameterName}
                      onChange={(e) =>
                        updateParameter(
                          parameter.id,
                          "parameterName",
                          e.target.value,
                        )
                      }
                      placeholder="Parameter name"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="text-xs">Value</Label>
                    <Input
                      type="number"
                      value={parameter.value}
                      onChange={(e) => {
                        const value = e.target.value;
                        const numValue = value === "" ? 0 : Number(value);
                        if (!isNaN(numValue)) {
                          updateParameter(parameter.id, "value", numValue);
                        }
                      }}
                      placeholder="0"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="text-xs">Alarm</Label>
                    <SelectComponent
                      value={parameter.alarm ? "true" : "false"}
                      onValueChange={(value) =>
                        updateParameter(parameter.id, "alarm", value === "true")
                      }
                      defaultValue="false"
                      placeholder="Alarm"
                      triggerClassName="w-full"
                      items={alarmSelectItems}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }, [
    form,
    sexSelectItems,
    alarmSelectItems,
    onSexSelectValueChange,
    parameters,
    addParameter,
    removeParameter,
    updateParameter,
    selectedSex,
  ]);

  const addPatientDialogFooter = useMemo(() => {
    return (
      <div className="flex w-full flex-col justify-center gap-2">
        <Button
          type="button"
          disabled={loading || form.formState.isSubmitting}
          onClick={() => form.handleSubmit(handleSubmitForm)()}
        >
          {loading ? (
            <div className="flex flex-row items-center gap-1">
              <Loader2 className="h-4 w-4 animate-spin" /> Adding...
            </div>
          ) : (
            "Add"
          )}
        </Button>
      </div>
    );
  }, [loading, form, handleSubmitForm]);

  return (
    <DialogComponent
      dialogContentClassName="lg:min-w-2xl"
      dialogFooterClassName="lg:flex-row lg:gap-2 md:flex-col-reverse md:gap-2"
      trigger={addPatientDialogTrigger}
      title="Add Patient"
      description="Add patient information"
      children={addPatientDialogContent}
      footer={addPatientDialogFooter}
      closeButton={
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
              setParameters([]);
              setSelectedSex("");
            }}
          >
            Cancel
          </Button>
        </DialogClose>
      }
    />
  );
};
