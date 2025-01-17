import {
  Container,
  SpaceBetween,
  Button,
  Header,
  FormField,
  Input,
  Select,
  ContentLayout,
  Form,
  Grid,
  FileUpload,
} from "@cloudscape-design/components";
import React, { useState } from "react";
import {
  JEWELLERY_CATEGORIES_LABEL,
  JEWELLERY_MATERIALS_LABEL,
} from "../utils/constants";
import { OptionDefinition } from "@cloudscape-design/components/internal/components/option/interfaces";

const AddJewelleryForm = () => {
  const [jewelleryName, setJewelleryName] = useState("");
  const [jewelleryCategoryData, setJewelleryCategoryData] =
    useState<OptionDefinition | null>(null);
  const [jewelleryDescription, setJewelleryDescription] = useState("");
  const [value, setValue] = useState<string>("");
  const [productImageUrl, setProductImageUrl] = useState<File[]>([]);
  return (
    <ContentLayout>
      <Container>
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
            header={<Header variant="h1">Add Jewellery </Header>}
          >
            <Container>
              <Grid
                gridDefinition={[
                  { colspan: { default: 12, xxs: 6 } },
                  { colspan: { default: 12, xxs: 6 } },
                  { colspan: { default: 12, xxs: 6 } },

                  { colspan: { default: 12, xxs: 6 } },
                  { colspan: { default: 12, xxs: 6 } },
                  { colspan: { default: 12, xxs: 6 } },

                  { colspan: { default: 12, xxs: 6 } },
                  { colspan: { default: 12, xxs: 6 } },
                  { colspan: { default: 12, xxs: 12 } },
                ]}
              >
                <FormField label="Jewellery Name">
                  <Input
                    value={jewelleryName}
                    onChange={({ detail }) => {
                      setJewelleryName(detail.value);
                    }}
                  />
                </FormField>
                <FormField label="Jewellery Description">
                  <Input
                    value={jewelleryDescription}
                    onChange={({ detail }) => {
                      setJewelleryDescription(detail.value);
                    }}
                  />
                </FormField>
                <FormField label="Jewellery Category">
                  <Select
                    selectedOption={jewelleryCategoryData}
                    onChange={({ detail }) =>
                      setJewelleryCategoryData(detail.selectedOption)
                    }
                    options={JEWELLERY_CATEGORIES_LABEL}
                  />
                </FormField>
                <FormField label="Total Stock">
                  <Input
                    onChange={({ detail }) => setValue(detail.value)}
                    value={value}
                    inputMode="numeric"
                    type="number"
                  />
                </FormField>
                <FormField label="Actual Price">
                  <Input
                    onChange={({ detail }) => setValue(detail.value)}
                    value={value}
                    inputMode="numeric"
                    type="number"
                  />
                </FormField>
                <FormField label="Discounted Price">
                  <Input
                    onChange={({ detail }) => setValue(detail.value)}
                    value={value}
                    inputMode="numeric"
                    type="number"
                  />
                </FormField>
                <FormField label="Material">
                  <Select
                    selectedOption={jewelleryCategoryData}
                    onChange={({ detail }) =>
                      setJewelleryCategoryData(detail.selectedOption)
                    }
                    options={JEWELLERY_MATERIALS_LABEL}
                  />
                </FormField>

                <FormField label="Weight">
                  <Input
                    onChange={({ detail }) => setValue(detail.value)}
                    value={value}
                    inputMode="numeric"
                    type="number"
                  />
                </FormField>
                <FormField
                  label="Add the Product image"
                  description="Description"
                >
                  <FileUpload
                    onChange={({ detail }) => setProductImageUrl(detail.value)}
                    value={productImageUrl}
                    i18nStrings={{
                      uploadButtonText: (e) =>
                        e ? "Choose files" : "Choose file",
                      dropzoneText: (e) =>
                        e ? "Drop files to upload" : "Drop file to upload",
                      removeFileAriaLabel: (e) => `Remove file ${e + 1}`,
                      limitShowFewer: "Show fewer files",
                      limitShowMore: "Show more files",
                      errorIconAriaLabel: "Error",
                      warningIconAriaLabel: "Warning",
                    }}
                    showFileLastModified
                    showFileSize
                    showFileThumbnail
                    tokenLimit={3}
                    constraintText="Hint text for file requirements"
                  />
                </FormField>
              </Grid>
            </Container>
          </Form>
        </form>
      </Container>
    </ContentLayout>
  );
};

export default AddJewelleryForm;
