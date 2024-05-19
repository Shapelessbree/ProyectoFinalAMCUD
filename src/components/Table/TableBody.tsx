interface TableHeadersProps {
  children: React.ReactNode;
}
export const TableBody = ({ children }: TableHeadersProps) => {
  return (
    <tbody className="text-s font-normal w-full text-white">
      {children}
    </tbody>
  );
};
