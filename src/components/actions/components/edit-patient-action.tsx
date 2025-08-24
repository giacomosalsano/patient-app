import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditIcon } from "lucide-react";
import { z } from "zod";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export const EditPatientAction = () => {
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
        <form>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label>Given Name</Label>
              <Input type="text" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Family Name</Label>
              <Input type="text" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Sex</Label>
              <Input type="text" />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Birth Date</Label>
              <Input type="date" />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
