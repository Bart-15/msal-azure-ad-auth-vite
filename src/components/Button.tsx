import { ButtonHTMLAttributes } from 'react';

type BtnProps = {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const SecondaryBtn = ({ children, ...props }: BtnProps) => {
  return (
    <button
      className="rounded-md border border-transparent px-3 py-2 text-base font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-gray-500"
      {...props}
    >
      {children}
    </button>
  );
};
