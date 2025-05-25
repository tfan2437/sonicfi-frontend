import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileImage = () => {
  return (
    <Avatar className="size-9 bg-blue-500">
      <AvatarImage src="" alt="@shadcn" />
      <AvatarFallback className="bg-blue-500">S</AvatarFallback>
    </Avatar>
  );
};

export default ProfileImage;
