interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const IconButton = ({ icon, onClick, disabled = false }: IconButtonProps) => {
  return (
    <button
      className="flex size-6 cursor-pointer items-center justify-center text-zinc-400 transition-all duration-200 hover:scale-105 hover:text-white"
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};
export default IconButton;
