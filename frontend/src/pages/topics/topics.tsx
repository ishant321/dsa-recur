import "./index.scss";
import DrButton from "../../components/dr_button";
import DrText from "../../components/dr_text";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "../../api/request";
import DrLoader from "../../components/dr_loader";
import DrItemForm from "../../components/dr_item_form";
import DrItemCard from "../../components/dr_item_card";
import DrSearchSort from "../../components/dr_search_sort";
import DrDeleteModal from "../../components/dr_delete_modal";
import type { ItemId, Topic } from "../../types";
import type { TopicFormData } from "../../components/dr_item_form/types";

export default function Topics() {
  const [allTopics, setAllTopics] = useState<Topic[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);
  const [allTopicsStatus, setAllTopicsStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [sortValue, setSortValue] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [deleteTopicId, setDeleteTopicId] = useState<ItemId | null>(null);

  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editTopicId, setEditTopicId] = useState<ItemId | null>(null);

  const navigate = useNavigate();
  const getAllTopics = async () => {
    try {
      const response = await request<Topic[]>({
        method: "GET",
        url: "/topics",
      });

      setAllTopics(response.data);
      setAllTopicsStatus("success");
    } catch (error) {
      setAllTopics([]);
      setAllTopicsStatus("error");
    }
  };

  const deleteTopic = async (id: ItemId) => {
    try {
      await request({ method: "DELETE", url: `/topics/${id}` });
      setIsDeleteModalOpen(false);
      await getAllTopics();
    } catch (error) {
      throw error;
    }
  };

  const createTopic = async (data: TopicFormData) => {
    try {
      const response = await request<Topic>({
        method: "POST",
        url: "/topics",
        payload: data,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updateTopic = async (id: ItemId, data: TopicFormData) => {
    try {
      const payload = {
        ...(data?.name ? { name: data.name, id } : {}),
      };

      await request({
        method: "PUT",
        url: `/topics`,
        payload,
      });
    } catch (error) {
      throw error;
    }
  };

  const handleFormSubmit = async (data: TopicFormData) => {
    await createTopic(data);
    await getAllTopics();
    setIsFormOpen(false);
  };

  useEffect(() => {
    getAllTopics();
  }, []);

  useEffect(() => {
    let filtered = allTopics.filter((topic) =>
      topic.name.toLowerCase().includes(searchValue.toLowerCase()),
    );

    if (sortValue) {
      filtered = filtered.sort((a, b) => {
        const aValue = a[sortValue as keyof Topic];
        const bValue = b[sortValue as keyof Topic];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return aValue.localeCompare(bValue);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return aValue - bValue;
        }

        return 0;
      });
    }

    setFilteredTopics(filtered);
  }, [allTopics, searchValue, sortValue]);

  return (
    <div style={{ display: "flex", flex: 1, minHeight: 0, minWidth: 0 }}>
      {isDeleteModalOpen && (
        <DrDeleteModal
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => deleteTopic(deleteTopicId!)}
        />
      )}
      {isEditFormOpen && (
        <DrItemForm
          mode="update"
          itemType="topic"
          initialValues={allTopics.find((t) => t.id === editTopicId)}
          onSubmit={async (data) => {
            await updateTopic(editTopicId!, data);
            await getAllTopics();
            setIsEditFormOpen(false);
          }}
          onClose={() => setIsEditFormOpen(false)}
        />
      )}
      {/* loading */}
      {allTopicsStatus === "loading" && (
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
      {allTopicsStatus === "success" && (
        <div style={{ display: "flex", flex: 1, minHeight: 0, minWidth: 0 }}>
          {!isFormOpen ? (
            allTopics.length === 0 ? (
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
                <DrText>No topics found.</DrText>
                <DrButton
                  variant="justText"
                  leadingIcon="plus"
                  onClick={() => setIsFormOpen(true)}
                >
                  Add Topic
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
                    flexWrap: "wrap",
                    overflow: "auto",
                  }}
                  className="flex flex-wrap gap-4 w-full"
                >
                  {filteredTopics.map((topic) => (
                    <DrItemCard
                      key={topic.id}
                      itemType="topic"
                      item={topic}
                      onDelete={() => {
                        setIsDeleteModalOpen(true);
                        setDeleteTopicId(topic.id);
                      }}
                      onEdit={() => {
                        setIsEditFormOpen(true);
                        setEditTopicId(topic.id);
                      }}
                      onClick={() => navigate(`/topics/${topic.id}/questions`)}
                    />
                  ))}
                </div>
              </div>
            )
          ) : (
            <DrItemForm
              itemType="topic"
              onClose={() => setIsFormOpen(false)}
              onSubmit={(data) => handleFormSubmit(data)}
            />
            // <h1>Form is open </h1>
          )}
        </div>
      )}

      {/* error */}
      {allTopicsStatus === "error" && (
        <div
          style={{ display: "flex", flex: 1, minHeight: 0 }}
          className="flex items-center justify-center "
        >
          <DrText>Error fetching topics.</DrText>
        </div>
      )}
    </div>
  );
}
