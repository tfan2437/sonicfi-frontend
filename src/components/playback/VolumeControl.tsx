import { Slider } from "@/components/ui/slider";
import {
  Laptop2Icon,
  Volume1Icon,
  AlignJustifyIcon,
  HandMetalIcon,
} from "lucide-react";

import IconButton from "@/components/button/IconButton";

interface VolumeControlProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  volume: number;
  setVolume: (volume: number) => void;
}

const VolumeControl = ({ audioRef, volume, setVolume }: VolumeControlProps) => {
  return (
    <div className="flex items-center gap-1 w-1/4 justify-end">
      <IconButton
        icon={<HandMetalIcon className="size-4" />}
        onClick={() => {}}
      />
      <IconButton
        icon={<AlignJustifyIcon className="size-4" />}
        onClick={() => {}}
      />
      <IconButton
        icon={<Laptop2Icon className="size-4" />}
        onClick={() => {}}
      />

      <div className="flex items-center gap-2">
        <IconButton
          icon={<Volume1Icon className="size-4" />}
          onClick={() => {}}
        />

        <Slider
          value={[volume]}
          max={100}
          step={1}
          className="w-24 hover:cursor-grab active:cursor-grabbing"
          onValueChange={(value) => {
            setVolume(value[0]);
            if (audioRef?.current) {
              audioRef.current.volume = value[0] / 100;
            }
          }}
        />
      </div>
    </div>
  );
};
export default VolumeControl;
