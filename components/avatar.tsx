import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  imgaeUrl: string;
};

export default function AvatarDemo({ imgaeUrl }: Props) {
  return (
    <Avatar className="h-6 w-6">
      <AvatarImage src={imgaeUrl} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
