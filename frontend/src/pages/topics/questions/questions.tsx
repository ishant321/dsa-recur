import "./index.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "../../../api/request";
import DrButton from "../../../components/dr_button";
import DrDeleteModal from "../../../components/dr_delete_modal";
import DrItemCard from "../../../components/dr_item_card";
import DrItemForm from "../../../components/dr_item_form";
import type { QuestionFormData } from "../../../components/dr_item_form/types";
import DrLoader from "../../../components/dr_loader";
import DrNotes from "../../../components/dr_notes";
import type { DrNote } from "../../../components/dr_notes/types";
import DrSearchSort from "../../../components/dr_search_sort";
import DrText from "../../../components/dr_text";
import type { ItemId, Question } from "../../../types";

export default function Questions() {
  const { topicId } = useParams();
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [sortValue, setSortValue] = useState("title");
  const [searchValue, setSearchValue] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editQuestionId, setEditQuestionId] = useState<ItemId | null>(null);
  const [deleteQuestionId, setDeleteQuestionId] = useState<ItemId | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [notes, setNotes] = useState<DrNote[]>([]);

  const getAllQuestions = async () => {
    try {
      const url = topicId ? `/questions?topic_id=${topicId}` : "/all_questions";
      const response = await request<Question[]>({ method: "GET", url });
      setAllQuestions(response.data);
      setStatus("success");
    } catch {
      setAllQuestions([]);
      setStatus("error");
    }
  };

  const getNotes = async (questionId: ItemId) => {
    const response = await request<DrNote[]>({
      method: "GET",
      url: `/notes?question_id=${questionId}`,
    });
    setNotes(response.data);
  };

  const openNotes = async (question: Question) => {
    setSelectedQuestion(question);
    setNotes([]);
    try {
      await getNotes(question.id);
    } catch {
      setNotes([]);
    }
  };

  const deleteQuestion = async (id: ItemId) => {
    await request({ method: "DELETE", url: `/questions/${id}` });
    setDeleteQuestionId(null);
    await getAllQuestions();
  };

  const createQuestion = async (data: QuestionFormData) => {
    await request<Question>({
      method: "POST",
      url: "/questions",
      payload: { ...data, topicId: topicId ?? data.topicId },
    });
  };

  const updateQuestion = async (id: ItemId, data: QuestionFormData) => {
    const currentQuestion = allQuestions.find((question) => question.id === id);
    await request<Question>({
      method: "PUT",
      url: "/questions",
      payload: {
        ...data,
        id,
        topicId: topicId ?? currentQuestion?.topicId ?? data.topicId,
      },
    });
  };

  const createNote = async (content: string) => {
    if (!selectedQuestion) return;
    await request<DrNote>({
      method: "POST",
      url: "/notes",
      payload: { content, questionId: selectedQuestion.id },
    });
    await getNotes(selectedQuestion.id);
  };

  const updateNote = async (note: DrNote, content: string) => {
    await request<DrNote>({
      method: "PUT",
      url: "/notes",
      payload: { id: note.id, content, questionId: note.questionId },
    });
    if (selectedQuestion) await getNotes(selectedQuestion.id);
  };

  const deleteNote = async (note: DrNote) => {
    await request<DrNote>({ method: "DELETE", url: `/notes/${note.id}` });
    if (selectedQuestion) await getNotes(selectedQuestion.id);
  };

  useEffect(() => {
    void getAllQuestions();
  }, [topicId]);

  useEffect(() => {
    const filtered = allQuestions
      .filter((question) => question.title.toLowerCase().includes(searchValue.toLowerCase()))
      .sort((first, second) => {
        const firstValue = first[sortValue as keyof Question];
        const secondValue = second[sortValue as keyof Question];
        if (typeof firstValue === "string" && typeof secondValue === "string") {
          return firstValue.localeCompare(secondValue);
        }
        if (typeof firstValue === "number" && typeof secondValue === "number") {
          return firstValue - secondValue;
        }
        return 0;
      });
    setFilteredQuestions(filtered);
  }, [allQuestions, searchValue, sortValue]);

  const editingQuestion = allQuestions.find((question) => question.id === editQuestionId);

  return (
    <div className="flex flex-1" style={{ minHeight: 0, minWidth: 0 }}>
      {deleteQuestionId !== null && (
        <DrDeleteModal onClose={() => setDeleteQuestionId(null)} onConfirm={() => deleteQuestion(deleteQuestionId)} />
      )}
      {isFormOpen && (
        <DrItemForm
          mode={editingQuestion ? "update" : "create"}
          itemType="question"
          topicId={topicId}
          initialValues={editingQuestion ? {
            title: editingQuestion.title,
            link: editingQuestion.link,
            difficulty: editingQuestion.difficulty,
            topicId: String(editingQuestion.topicId),
          } : undefined}
          onClose={() => { setIsFormOpen(false); setEditQuestionId(null); }}
          onSubmit={async (data) => {
            if (editingQuestion) await updateQuestion(editingQuestion.id, data);
            else await createQuestion(data);
            await getAllQuestions();
            setIsFormOpen(false);
            setEditQuestionId(null);
          }}
        />
      )}
      {selectedQuestion && (
        <DrNotes
          questionName={selectedQuestion.title}
          notes={notes}
          onClose={() => setSelectedQuestion(null)}
          onAdd={createNote}
          onUpdate={updateNote}
          onDelete={deleteNote}
        />
      )}
      {status === "loading" && <div className="flex flex-1 items-center justify-center"><DrLoader size="xl" /></div>}
      {status === "error" && <div className="flex flex-1 items-center justify-center"><DrText>Error fetching questions.</DrText></div>}
      {status === "success" && (
        <div className="m-4 flex flex-1 flex-col gap-8 items-center" style={{ minHeight: 0, minWidth: 0 }}>
          <div className="w-full flex justify-between">
            <DrSearchSort
              value={searchValue}
              sortOptions={[{ label: "Title", value: "title" }, { label: "Visited count", value: "visitedCount" }]}
              sortValue={sortValue}
              onSortChange={setSortValue}
              onSearchChange={setSearchValue}
            />
            <DrButton leadingIcon="plus" onClick={() => setIsFormOpen(true)}>Create</DrButton>
          </div>
          {filteredQuestions.length === 0 ? (
            <DrText>No questions found.</DrText>
          ) : (
            <div className="flex flex-col gap-4 w-full" style={{ overflow: "auto", width: "70%" }}>
              {filteredQuestions.map((question) => (
                <DrItemCard
                  key={question.id}
                  itemType="question"
                  item={question}
                  onDelete={() => setDeleteQuestionId(question.id)}
                  onEdit={() => { setEditQuestionId(question.id); setIsFormOpen(true); }}
                  onAddNote={() => { void openNotes(question); }}
                  onViewNotes={() => { void openNotes(question); }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
