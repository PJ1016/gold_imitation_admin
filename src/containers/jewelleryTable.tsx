import { useEffect, useState, useMemo, useCallback, memo } from "react";
import Header from "@cloudscape-design/components/header";
import Container from "@cloudscape-design/components/container";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import {
  Box,
  Table,
  TextFilter,
  Pagination,
  CollectionPreferences,
} from "@cloudscape-design/components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface JewelleryItem {
  name: string;
  price: number;
  discountedPrice: number;
  description: string;
  categoryId: number;
  stock: number;
  material: string;
  weight: number;
  imageUrl: string;
  createdAt: string;
  rating?: number;
  isAddedToCart?: boolean;
}

const COLUMN_DEFINITIONS = [
  {
    id: "imageUrl",
    header: "Product Image",
    cell: (item: JewelleryItem) => (
      <img width="80" height="80" src={item.imageUrl} alt={item.name} />
    ),
    sortingField: "imageUrl",
  },
  {
    id: "name",
    header: "Name",
    cell: (item: JewelleryItem) => item.name,
    sortingField: "name",
    isRowHeader: true,
  },
  {
    id: "price",
    header: "Original Price",
    cell: (item: JewelleryItem) => `₹${item.price}`,
    sortingField: "price",
  },
  {
    id: "discountedPrice",
    header: "Discounted Price",
    cell: (item: JewelleryItem) => `₹${item.discountedPrice}`,
    sortingField: "discountedPrice",
  },
  {
    id: "description",
    header: "Description",
    cell: (item: JewelleryItem) => item.description,
    sortingField: "description",
  },

  {
    id: "stock",
    header: "Stock",
    cell: (item: JewelleryItem) => item.stock,
    sortingField: "stock",
  },
  {
    id: "material",
    header: "Material",
    cell: (item: JewelleryItem) => item.material,
    sortingField: "material",
  },
  {
    id: "weight",
    header: "Weight (g)",
    cell: (item: JewelleryItem) => `${item.weight}g`,
    sortingField: "weight",
  },
];

const TableHeader = memo(
  ({ selectedItems }: { selectedItems: JewelleryItem[] }) => {
    const navigate = useNavigate();
    return (
      <Header
        counter={selectedItems.length ? `(${selectedItems.length}/10)` : "(10)"}
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button disabled={selectedItems.length === 0}>Edit</Button>
            <Button disabled={selectedItems.length === 0}>Delete</Button>
            <Button
              variant="primary"
              onClick={() => navigate("/addJewelleryItem")}
            >
              Add item
            </Button>
          </SpaceBetween>
        }
      >
        Jewellery Items
      </Header>
    );
  }
);

const PREFERENCES_OPTIONS = {
  pageSize: [
    { value: 10, label: "10 items" },
    { value: 20, label: "20 items" },
    { value: 50, label: "50 items" },
  ],
  visibleContent: COLUMN_DEFINITIONS.map(({ id, header }) => ({
    id,
    label: header,
  })),
};

export default function JewelleryTable() {
  const [tableData, setTableData] = useState<JewelleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<JewelleryItem[]>([]);

  // Pagination state
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState<number>(3);

  // Filtering state
  const [filteringText, setFilteringText] = useState("");

  // Preferences state
  const [preferences, setPreferences] = useState({
    pageSize: 3,
    visibleContent: COLUMN_DEFINITIONS.map(({ id }) => id),
  });

  const getJewelleryData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://gold-imitation-flask.onrender.com/getJewellery",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTableData(response.data);
    } catch (error: any) {
      setError(error.message);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getJewelleryData();
  }, [getJewelleryData]);

  const columnDefinitions = useMemo(() => COLUMN_DEFINITIONS, []);

  const handleSelectionChange = useCallback(({ detail }: any) => {
    setSelectedItems(detail.selectedItems);
  }, []);

  // Filter items based on text
  const filteredItems = useMemo(() => {
    if (!filteringText) return tableData;
    const lowercaseFilter = filteringText?.toLowerCase();
    return tableData.filter(
      (item) =>
        item.name?.toLowerCase().includes(lowercaseFilter) ||
        item.description?.toLowerCase().includes(lowercaseFilter) ||
        item.material?.toLowerCase().includes(lowercaseFilter)
    );
  }, [tableData, filteringText]);

  // Calculate pagination
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPageIndex - 1) * pageSize;
    return filteredItems.slice(startIndex, startIndex + pageSize);
  }, [filteredItems, currentPageIndex, pageSize]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <SpaceBetween size="m">
      <TableHeader selectedItems={selectedItems} />
      <Container>
        <SpaceBetween size="m">
          <Table
            loading={loading}
            loadingText="Loading jewellery items"
            items={paginatedItems}
            columnDefinitions={columnDefinitions.filter((col) =>
              preferences.visibleContent.includes(col.id)
            )}
            onSelectionChange={handleSelectionChange}
            selectedItems={selectedItems}
            selectionType="multi"
            trackBy="name"
            empty={
              <Box textAlign="center" color="inherit">
                <b>No jewellery items</b>
                <Box padding={{ bottom: "s" }} variant="p" color="inherit">
                  No jewellery items to display.
                </Box>
              </Box>
            }
            filter={
              <TextFilter
                filteringText={filteringText}
                onChange={({ detail }) =>
                  setFilteringText(detail.filteringText)
                }
              />
            }
            pagination={
              <Pagination
                currentPageIndex={currentPageIndex}
                onChange={({ detail }) =>
                  setCurrentPageIndex(detail.currentPageIndex)
                }
                pagesCount={Math.ceil(filteredItems.length / pageSize)}
              />
            }
            preferences={
              <CollectionPreferences
                title="Preferences"
                confirmLabel="Confirm"
                cancelLabel="Cancel"
                preferences={preferences}
                pageSizePreference={{
                  title: "Page size",
                  options: PREFERENCES_OPTIONS.pageSize,
                }}
                onConfirm={({ detail }: any) => setPreferences(detail)}
              />
            }
          />
        </SpaceBetween>
      </Container>
    </SpaceBetween>
  );
}
