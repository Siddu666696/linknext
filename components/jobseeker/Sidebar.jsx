import { Drawer, List, ListItem, ListItemButton } from "@mui/material";
// import SettingsIcon from "../../assets/svg/settingsicon.svg?react";
import React from "react";
import { SideBarList } from "@/lib/utils/commonValues";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = React.memo(function Sidebar({ open }) {
  const location = usePathname();
  const router = useRouter();
  const currentLocation = location.pathname;

  return (
    <Drawer
      sx={{
        width: "240px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          zIndex: 900,
        },
        display: { xs: "block", md: "none" },
        py: 2,
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <List sx={{ mt: 8 }}>
        {SideBarList.map((item) => (
          <ListItem
            key={item?.label}
            disablePadding
            sx={{
              "&:hover": {
                bgcolor: "#6BAEDE54",
              },
              backgroundColor:
                item?.routes?.includes(currentLocation) && "#6BAEDE54",
              height: 50,
            }}
          >
            <ListItemButton
              onClick={() => {
                router.push(item?.path);
              }}
              color="#0070B3"
            >
              <ListItem
                primary={item?.label}
                sx={{
                  ".MuiTypography-root": {
                    color: item?.routes?.includes(currentLocation) && "#0070B3",
                    fontWeight:
                      item?.routes?.includes(currentLocation) && "600",
                  },
                  gap: 2,
                }}
              >
                {/* <item.icon /> */}
                {item.label}
              </ListItem>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem sx={{ mt: 7 }}>
          <ListItemButton
            sx={{ gap: 2 }}
            onClick={() => {
              router.push("/settings/profile");
            }}
          >
            {/* <SettingsIcon /> */}
            Settings
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
});

export default Sidebar;
