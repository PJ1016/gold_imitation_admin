import {
  AppLayout,
  BreadcrumbGroup,
  Button,
  Container,
  ContentLayout,
  Flashbar,
  Form,
  FormField,
  Header,
  Input,
  Link,
  SideNavigation,
  SpaceBetween,
} from "@cloudscape-design/components";
import React from "react";

const AddJewelleryItem = () => {
  return (
    <AppLayout
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: "Home", href: "#" },
            { text: "Service", href: "#" },
          ]}
        />
      }
      navigationOpen={true}
      navigation={
        <SideNavigation
          header={{
            href: "#",
            text: "Service name",
          }}
          items={[{ type: "link", text: `Page #1`, href: `#` }]}
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
      content={
        <ContentLayout
          header={
            <Header variant="h1" info={<Link variant="info">Info</Link>}>
              Page header
            </Header>
          }
        >
          <Container
            header={
              <Header variant="h2" description="Container description">
                Container header
              </Header>
            }
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <Form
                actions={
                  <SpaceBetween direction="horizontal" size="xs">
                    <Button formAction="none" variant="link">
                      Cancel
                    </Button>
                    <Button variant="primary">Submit</Button>
                  </SpaceBetween>
                }
                header={<Header variant="h1">Form header</Header>}
              >
                <Container
                  header={<Header variant="h2">Form container header</Header>}
                >
                  <SpaceBetween direction="vertical" size="l">
                    <FormField label="First field">
                      <Input value="" />
                    </FormField>
                    <FormField label="Second field">
                      <Input value="" />
                    </FormField>
                    <FormField label="Third field">
                      <Input value="" />
                    </FormField>
                  </SpaceBetween>
                </Container>
              </Form>
            </form>
          </Container>
        </ContentLayout>
      }
    />
  );
};

export default AddJewelleryItem;
