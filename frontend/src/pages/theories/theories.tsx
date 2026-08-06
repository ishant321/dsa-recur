import "./index.scss";
import DrButton from "../../components/dr_button";
import DrText from "../../components/dr_text";
import { useEffect, useState } from "react";
import { request } from "../../api/request";
import DrLoader from "../../components/dr_loader";
import DrItemForm from "../../components/dr_item_form";
import DrItemCard from "../../components/dr_item_card";
import DrSearchSort from "../../components/dr_search_sort";
import DrDeleteModal from "../../components/dr_delete_modal";
import DrTheoryViewer from "../../components/dr_theory_viewer";
import type { ItemId, Theory } from "../../types";
import type { TheoryFormData } from "../../components/dr_item_form/types";

export default function Theories() {
  const [allTheories, setAllTheories] = useState<Theory[]>([]);
  const [filteredTheories, setFilteredTheories] = useState<Theory[]>([]);
  const [allTheoriesStatus, setAllTheoriesStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [sortValue, setSortValue] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [deleteTheoryId, setDeleteTheoryId] = useState<ItemId | null>(null);

  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editTheoryId, setEditTheoryId] = useState<ItemId | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewTheoryId, setViewTheoryId] = useState<ItemId | null>(null);

  const getAllTheories = async () => {
    try {
      const response = await request<Theory[]>({
        method: "GET",
        url: "/theory/all",
      });

      console.log("response", response);

      setAllTheories(response.data);
      setAllTheoriesStatus("success");
    } catch (error) {
      setAllTheories([]);
      setAllTheoriesStatus("error");
    }
  };

  const deleteTheory = async (id: ItemId) => {
    try {
      await request({ method: "DELETE", url: `/theory/${id}` });
      setIsDeleteModalOpen(false);
      await getAllTheories();
    } catch (error) {
      throw error;
    }
  };

  const createTheory = async (data: TheoryFormData) => {
    try {
      const response = await request<Theory>({
        method: "POST",
        url: "/theory",
        payload: { ...data },
      });
      console.log("response", response);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updateTheory = async (id: ItemId, data: TheoryFormData) => {
    try {
      console.log("data", data)
      const payload = { id: id, title: data.title, content: data.content };

      await request({
        method: "PUT",
        url: `/theory`,
        payload,
      });
    } catch (error) {
      throw error;
    }
  };

  // Mark theory as visited
  const markTheoryAsVisited = async (id: ItemId) => {
    try {
      await request({ method: "GET", url: `/theory/${id}` });
    } catch (error) {
      console.error("Failed to mark theory as visited:", error);
    }
  };

  const handleFormSubmit = async (data: TheoryFormData) => {
    await createTheory(data);
    await getAllTheories();
    setIsFormOpen(false);
  };

  useEffect(() => {
    getAllTheories();
  }, []);

  useEffect(() => {
    if(!viewTheoryId) return;
    markTheoryAsVisited(viewTheoryId);

  }, [viewTheoryId]);

  useEffect(() => {
    let filtered = allTheories.filter((theory) =>
      theory.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    if (sortValue) {
      filtered = filtered.sort((a, b) => {
        const aValue = a[sortValue as keyof Theory];
        const bValue = b[sortValue as keyof Theory];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return aValue.localeCompare(bValue);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return aValue - bValue;
        }

        return 0;
      });
    }

    setFilteredTheories(filtered);
  }, [allTheories, searchValue, sortValue]);

  return (
    <div style={{ display: "flex", flex: 1, minHeight: 0, minWidth: 0 }}>
      {isDeleteModalOpen && (
        <DrDeleteModal
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => deleteTheory(deleteTheoryId!)}
        />
      )}
      {isEditFormOpen && (
        <DrItemForm
          mode="update"
          itemType="theory"
          initialValues={allTheories.find((t) => t.id === editTheoryId)}
          onSubmit={async (data) => {
            await updateTheory(editTheoryId!, data);
            await getAllTheories();
            setIsEditFormOpen(false);
          }}
          onClose={() => setIsEditFormOpen(false)}
        />
      )}

      {isViewOpen && (
        <DrTheoryViewer
          content={allTheories.find((t) => t.id === viewTheoryId)?.content ?? ""}
          title={allTheories.find((t) => t.id === viewTheoryId)?.title ?? ""}
          onClose={() => {
            setIsViewOpen(false);
          }}
        />
      )}

      {/* loading */}
      {allTheoriesStatus === "loading" && (
        <div
          style={{
            display: "flex",
            flex: 1,
            minHeight: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DrLoader size="xl" />
        </div>
      )}

      {/* success */}
      {allTheoriesStatus === "success" && (
        <div style={{ display: "flex", flex: 1, minHeight: 0, minWidth: 0 }}>
          {!isFormOpen ? (
            allTheories.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  minHeight: 0,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="gap-4"
              >
                <DrText>No theories found.</DrText>
                <DrButton
                  variant="justText"
                  leadingIcon="plus"
                  onClick={() => setIsFormOpen(true)}
                >
                  Add Theory
                </DrButton>
              </div>
            ) : (
              <div
                style={{ display: "flex", flex: 1, minHeight: 0, minWidth: 0 }}
                className="m-4 flex-col gap-8 items-center"
              >
                <div className="w-full flex justify-between">
                  <DrSearchSort
                    value={searchValue}
                    sortOptions={[
                      { label: "Name", value: "name" },
                      { label: "Created At", value: "createdAt" },
                    ]}
                    sortValue={sortValue}
                    onSortChange={(value) => setSortValue(value)}
                    onSearchChange={(value) => setSearchValue(value)}
                  />
                  <DrButton
                    leadingIcon="plus"
                    style={{ height: "fit-content" }}
                    onClick={() => setIsFormOpen(true)}
                  >
                    Create
                  </DrButton>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto",
                    width: "70%",
                  }}
                  className="flex flex-wrap gap-4 w-full"
                >
                  {filteredTheories.map((theory) => (
                    <DrItemCard
                      key={theory.id}
                      itemType="theory"
                      item={theory}
                      isViewable={true}
                      onDelete={() => {
                        setIsDeleteModalOpen(true);
                        setDeleteTheoryId(theory.id);
                      }}
                      onEdit={() => {
                        setIsEditFormOpen(true);
                        setEditTheoryId(theory.id);
                      }}
                      onView={() => {
                        setIsViewOpen(true);
                        setViewTheoryId(theory.id);
                      }}
                    />
                  ))}
                </div>
              </div>
            )
          ) : (
            <DrItemForm
              itemType="theory"
              onClose={() => setIsFormOpen(false)}
              onSubmit={(data) => handleFormSubmit(data)}
            />
            // <h1>Form is open </h1>
          )}
        </div>
      )}

      {/* error */}
      {allTheoriesStatus === "error" && (
        <div
          style={{ display: "flex", flex: 1, minHeight: 0 }}
          className="flex items-center justify-center "
        >
          <DrText>Error fetching theories.</DrText>
        </div>
      )}
    </div>
  );
}
