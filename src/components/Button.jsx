import { Button as MUIButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const Button = ({ variantType = "default", children, ...props }) => {
  const config = {
    add: { color: "primary", startIcon: <AddIcon /> },
    delete: { color: "error" },
    details: { color: "secondary" },
    default: { color: "primary" },
  }[variantType];

  return (
    <MUIButton variant="contained" {...config} {...props}>
      {children}
    </MUIButton>
  );
}
