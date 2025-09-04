import React from "react";
import {
  Popover,
  Box,
  Checkbox,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Divider,
} from "@mui/material";

interface GenericFilterPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  title: string;
  options: Array<{ key: string; label: string }>;
  selectedOptions: string[];
  onApply: (selected: object) => void;
  allowMultiSelect?: boolean;
}

const GenericFilterPopover: React.FC<GenericFilterPopoverProps> = React.memo(
  ({
    anchorEl,
    onClose,
    title,
    options,
    selectedOptions,
    onApply,
    allowMultiSelect = true,
  }) => {
    const [localSelected, setLocalSelected] = React.useState<string[]>([]);

    // React.useEffect(() => {
    //   setLocalSelected(selectedOptions||[]);
    // }, [selectedOptions]);

    const toggleOption = (key: string) => {

      if (allowMultiSelect) {
        setLocalSelected((prev) =>
          prev?.includes(key)
            ? prev.filter((item) => item !== key)
            : [...prev, key]
      )
      } else {
        setLocalSelected([key]);
      }
    };

    const handleApply = () => {
      switch(title){
        case "Location":
          onApply({"location":localSelected});
          break;
        case "Skills":
          onApply({"skills":localSelected});
          break;
          case "Education":
          onApply({"education":localSelected});
          break;
          case "Specialization":
          onApply({"specialization":localSelected});
          break;
          default:
            console.error(title, "is not a valid filter title");
            
      }
      
      onClose();
    };

    const open = Boolean(anchorEl);
    const id = open ? "generic-filter-popover" : undefined;
console.log(selectedOptions, "selectedOptions in GenericFilterPopover");


    return (
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        disableRestoreFocus
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
            {title}
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <List   sx={{
        // width: '100%',
        width: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 200,
        '& ul': { padding: 0 },
      }}>
            {options?.map((option) => (
              <ListItem
                key={option.key}
                // button
                onClick={() => toggleOption(option.key)}
              >
                {allowMultiSelect && (
                  <ListItemIcon>
                    <Checkbox
                      // edge="start"
                      color="primary"
                      checked={selectedOptions?.includes(option.key)}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                )}
                <ListItemText primary={option.key} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button size="small" onClick={onClose}>
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={handleApply}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Popover>
    );
  }
);

GenericFilterPopover.displayName = "GenericFilterPopover";

export default GenericFilterPopover;
