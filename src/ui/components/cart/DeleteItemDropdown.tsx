import type { ReactNode } from "react";

import { Trash2 as TrashIcon } from "lucide-react";

type DeleteItemDropdownProps = {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  onDelete: () => void;
  trigger: ReactNode;
};

export function DeleteItemDropdown({
  isOpen,
  onToggle,
  onDelete,
  trigger,
}: DeleteItemDropdownProps) {
  const handleTriggerClick = () => {
    onToggle(!isOpen);
  };

  const handleDeleteClick = () => {
    onDelete();
    onToggle(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleTriggerClick}
        className="cursor-pointer rounded p-1 text-slate-500 transition hover:bg-slate-700 hover:text-slate-300"
        type="button"
      >
        {trigger}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-lg border border-slate-700 bg-slate-800 py-1 shadow-lg">
          <button
            onClick={handleDeleteClick}
            className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm text-slate-300 transition-colors duration-200 hover:text-red-500"
            type="button"
          >
            <TrashIcon className="h-4 w-4" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
