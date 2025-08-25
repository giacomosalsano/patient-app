import {
  addPatient,
  listPatientById,
  listPatients,
  updatePatient,
} from "@/modules/patient/service/patientService";

import type {
  AddPatientProps,
  AddPatientResponse,
  ListPatientByIdProps,
  ListPatientByIdResponse,
  ListPatientProps,
  ListPatientResponse,
  Patient,
  UpdatePatientProps,
  UpdatePatientResponse,
} from "@/modules/patient/types";

import { isAxiosError, type AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "sonner";

type Handler<T, R = void> = {
  props: T;
  onSuccess?: (response?: R) => void;
  onError?: (error: AxiosError) => void;
};

interface Properties {
  loading: boolean;
  patients: Patient[];
}

export function usePatient() {
  const [properties, setProperties] = useState<Properties>({
    loading: false,
    patients: [],
  });

  const handleSetProperties = useCallback(
    (newProperties: Partial<Properties>) => {
      setProperties((prev) => ({ ...prev, ...newProperties }));
    },
    [],
  );

  const handleGetPatients = useCallback(
    async ({
      onSuccess,
      onError,
    }: Handler<ListPatientProps, ListPatientResponse>) => {
      handleSetProperties({ loading: true });

      try {
        const { data } = await listPatients();

        handleSetProperties({ patients: Array.isArray(data) ? data : [data] });

        if (onSuccess) {
          onSuccess(data);
          return data;
        }
      } catch (error) {
        if (isAxiosError(error)) {
          if (onError) {
            onError(error);
            return;
          }
        }

        toast.error("Error listing patients");
      } finally {
        handleSetProperties({ loading: false });
      }
    },
    [handleSetProperties],
  );

  const handleGetPatientById = useCallback(
    async ({
      props,
      onSuccess,
      onError,
    }: Handler<ListPatientByIdProps, ListPatientByIdResponse>) => {
      handleSetProperties({ loading: true });

      try {
        const { data } = await listPatientById({ id: props.id });

        toast.success("Patient listed successfully");

        handleSetProperties({ patients: [data] });

        if (onSuccess) {
          onSuccess(data);
          return data;
        }
      } catch (error) {
        if (isAxiosError(error)) {
          if (onError) {
            onError(error);
            return;
          }
        }

        toast.error("Error listing patients");
      } finally {
        handleSetProperties({ loading: false });
      }
    },
    [handleSetProperties],
  );

  const handleAddPatient = useCallback(
    async ({
      props,
      onSuccess,
      onError,
    }: Handler<AddPatientProps, AddPatientResponse>) => {
      handleSetProperties({ loading: true });

      try {
        const { data } = await addPatient(props);

        toast.success("Patient added successfully");

        if (onSuccess) {
          onSuccess(data);
          return data;
        }
      } catch (error) {
        if (isAxiosError(error)) {
          if (onError) {
            onError(error);
            return;
          }
        }

        toast.error("Error adding patient");
      } finally {
        handleSetProperties({ loading: false });
      }
    },
    [handleSetProperties],
  );

  const handleUpdatePatient = useCallback(
    async ({
      props,
      onSuccess,
      onError,
    }: Handler<UpdatePatientProps, UpdatePatientResponse>) => {
      handleSetProperties({ loading: true });

      try {
        const { data } = await updatePatient(props);

        toast.success("Patient updated successfully");

        if (onSuccess) {
          onSuccess(data);
          return data;
        }
      } catch (error) {
        if (isAxiosError(error)) {
          if (onError) {
            onError(error);
            return;
          }
        }

        toast.error("Error updating patient");
      } finally {
        handleSetProperties({ loading: false });
      }
    },
    [handleSetProperties],
  );

  return {
    loading: properties.loading,
    patients: properties.patients,
    handlers: {
      handleGetPatients,
      handleGetPatientById,
      handleAddPatient,
      handleUpdatePatient,
    },
  };
}
