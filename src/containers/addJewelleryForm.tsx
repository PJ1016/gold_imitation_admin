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
import axios from "axios";

const AddJewelleryForm = () => {
  const [jewelleryName, setJewelleryName] = useState("");
  const [jewelleryDescription, setJewelleryDescription] = useState("");
  const [jewelleryCategoryData, setJewelleryCategoryData] =
    useState<OptionDefinition | null>(null);
  const [material, setMaterial] = useState<OptionDefinition | null>(null);
  const [stock, setStock] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [discountedPrice, setDiscountedPrice] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [productImageUrl, setProductImageUrl] = useState<File[]>([]);
  const handleSubmit = async () => {
    if (
      !productImageUrl ||
      !jewelleryName ||
      !jewelleryDescription ||
      !material ||
      !stock ||
      !price ||
      !discountedPrice ||
      !weight ||
      !jewelleryCategoryData
    ) {
      alert("Please fill in all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("name", jewelleryName);
    formData.append("description", jewelleryDescription);
    formData.append("category", jewelleryCategoryData?.value as string);
    formData.append("material", material?.value as string);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("discountedPrice", discountedPrice);
    formData.append("weight", weight);
    formData.append("file", productImageUrl[0]);

    console.log(formData);

    try {
      const response = await axios.post(
        "https://gold-imitation-flask.onrender.com/uploadJewellery",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("File uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    }
  };
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
                <Button variant="primary" onClick={handleSubmit}>
                  Submit
                </Button>
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
                    onChange={({ detail }) => setStock(detail.value)}
                    value={stock}
                    inputMode="numeric"
                    type="number"
                  />
                </FormField>
                <FormField label="Actual Price">
                  <Input
                    onChange={({ detail }) => setPrice(detail.value)}
                    value={price}
                    inputMode="numeric"
                    type="number"
                  />
                </FormField>
                <FormField label="Discounted Price">
                  <Input
                    onChange={({ detail }) => setDiscountedPrice(detail.value)}
                    value={discountedPrice}
                    inputMode="numeric"
                    type="number"
                  />
                </FormField>
                <FormField label="Material">
                  <Select
                    selectedOption={jewelleryCategoryData}
                    onChange={({ detail }) =>
                      setMaterial(detail.selectedOption)
                    }
                    options={JEWELLERY_MATERIALS_LABEL}
                  />
                </FormField>

                <FormField label="Weight">
                  <Input
                    onChange={({ detail }) => setWeight(detail.value)}
                    value={weight}
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
