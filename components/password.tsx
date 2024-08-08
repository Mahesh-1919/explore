import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function Component({
  password,
  setPassword,
  labels,
  placeholder,
}: any) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full max-w-sm ">
      <div className="relative space-y-2">
        <div className="flex items-center">
          <Label htmlFor={labels}>{labels}</Label>
        </div>
        <Input
          id={labels}
          type={showPassword ? "text" : "password"}
          required
          placeholder={placeholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-black/10 border border-/10 rounded-xl text-sm block w-full p-2.5"
        />
        <Button
          size="icon"
          variant={"ghost"}
          className="absolute bottom-1 right-1 h-7 w-7 hover:bg-inherit hover:text-black/50  "
          onClick={() => setShowPassword(!showPassword)}
          type="button"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle password visibility</span>
        </Button>
      </div>
    </div>
  );
}
