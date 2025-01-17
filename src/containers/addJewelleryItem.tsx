import {
  AppLayout,
  BreadcrumbGroup,
  Flashbar,
  SideNavigation,
} from "@cloudscape-design/components";
import React from "react";
import AddJewelleryForm from "./addJewelleryForm";

const AddJewelleryItem = () => {
  const [isNavigationOpen, setIsNavigationOpen] = React.useState(true);
  return (
    <AppLayout
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: "Home", href: "#" },
            { text: "Jewellery", href: "#addJewelleryItem" },
          ]}
        />
      }
      onNavigationChange={() => {
        setIsNavigationOpen(!isNavigationOpen);
      }}
      navigationOpen={isNavigationOpen}
      navigation={
        <SideNavigation
          header={{
            href: "#",
            text: "VS Arts",
          }}
          items={[
            {
              type: "link",
              text: `VS arts prod`,
              external: true,
              href: `https://gold-imitation.onrender.com/`,
            },
          ]}
        />
      }
      notifications={
        <Flashbar
          items={[
            {
              type: "info",
              dismissible: true,
              content: "This is an info flash message.",
              id: "message_1",
            },
          ]}
        />
      }
      content={<AddJewelleryForm />}
    />
  );
};

export default AddJewelleryItem;
