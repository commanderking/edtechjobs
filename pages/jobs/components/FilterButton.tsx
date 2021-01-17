import { Button } from "@chakra-ui/react";

type Props = {
  onClick: () => void;
  children: React.ReactChildren | string;
  isClicked: boolean;
  colorScheme;
  string;
};
const FilterButton = ({ onClick, children, isClicked, colorScheme }: Props) => {
  const variant = isClicked ? "solid" : "outline";
  return (
    <Button onClick={onClick} colorScheme={colorScheme} variant={variant}>
      {children}
    </Button>
  );
};

export default FilterButton;
