interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const IconButton = ({ icon, onClick, disabled = false }: IconButtonProps) => {
  return (
    <button
      className="hover:text-white text-zinc-400 hover:scale-105 transition-all duration-200 cursor-pointer size-6 flex items-center justify-center"
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};
export default IconButton;
