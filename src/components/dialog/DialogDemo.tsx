import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const DialogDemo = () => {
  return (
    <Dialog open={false}>
      <DialogTrigger asChild>
        <Button variant="outline">Create New Playlist</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Playlist</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <Button type="submit">Save changes</Button>
      </DialogContent>
    </Dialog>
  );
};
export default DialogDemo;
