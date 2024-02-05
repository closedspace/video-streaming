type ConditionalProps = {
  children: React.ReactNode;
  on: boolean;
};
export const Conditional = ({ children, on }: ConditionalProps) => {
  return <>{on && children}</>;
};
