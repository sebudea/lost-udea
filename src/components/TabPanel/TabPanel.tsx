import { Box } from "@mui/material";
import type { TabPanelProps } from "./types";

export const TabPanel = ({
  children,
  value,
  index,
  ...other
}: TabPanelProps) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      component="div"
      sx={{
        p: 3,
        width: "100%",
        height: "100%",
        overflow: "auto",
      }}
      {...other}
    >
      {value === index && <Box sx={{ height: "100%" }}>{children}</Box>}
    </Box>
  );
};
