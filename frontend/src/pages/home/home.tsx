import "./index.scss";
import DrButton from "../../components/dr_button";
import DrIcon from "../../components/dr_icon";
import DrText from "../../components/dr_text";
import { useNavigate } from "react-router-dom";
import { request } from "../../api/request";
import { useState } from "react";
import type { TheoryItem } from "../../components/dr_item_card";
import DrTheoryViewer from "../../components/dr_theory_viewer";

export default function Home() {
  const navigate = useNavigate();
  const [ theory, setTheory ] = useState<TheoryItem | null>(null)

const navigateToQOD = async () => {
  try {
    const response = await request({
      method: "GET",
      url: "/questions/random",
    });

    const link = response?.data?.link ?? null;

    if (!link) {
      throw new Error("No question found");
    }

    window.open(link, "_blank"); // Opens in a new tab
  } catch (error) {
    console.error("Failed to fetch Question of the Day:", error);
  }
};

const openTOD = async () => {
  try {
    const response: { data: TheoryItem } = await request({
      method: "GET",
      url: "/theory/random",
    });
    console.log(response)
    setTheory(response?.data ?? null)
  } catch (error) {
    console.error("Failed to fetch Theory of the Day:", error);
  }
};

  return (
    theory ? (<DrTheoryViewer 
          content={theory.content}
          title={theory.title}
          onClose={() => {
            setTheory(null);
          }} />) : 
    (<div className="home">
      {/* ================= MIDDLE-2 ================= */}
      <div className="flex flex-col items-center justify-center gap-4 p-3">
        <DrText variant="h1" className="home-main-heading">
          DSA Recur
        </DrText>

        <DrText
          className="text-muted home-main-subheading"
          style={{ maxWidth: "500px" }}
        >
          Transform your coding journey with a structured DSA roadmap,
          consistent practice, and intelligent revision. Build lasting
          confidence for coding interviews and competitive programming.
        </DrText>
      </div>

      {/* ================= MIDDLE ================= */}
      {/* <div className="flex flex-row p-6 items-center justify-center gap-6 w-full">
        <DrButton
          style={{ width: "18%" }}
          variant="outline"
          onClick={() => alert("Button clicked!")}
          leadingIcon="plus"
        >
          Add Topic
        </DrButton>

        <DrButton
          style={{ width: "18%" }}
          variant="outline"
          onClick={() => alert("Button clicked!")}
          leadingIcon="question_mark"
        >
          Add Question
        </DrButton>

        <DrButton
          style={{ width: "18%" }}
          variant="outline"
          onClick={() => alert("Button clicked!")}
          leadingIcon="book"
        >
          Add Theory
        </DrButton>
      </div> */}

      {/* ================= BOTTOM ================= */}
      <div className="flex h-full w-full flex-1 items-center px-6 gap-6">
        {/* ================= LEFT ================= */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex gap-4 mt-3">
            <div
              className="card flex flex-col items-center gap-4"
              style={{ flex: 1 }}
            >
              <DrIcon name="pin" size="m" />
              <DrText variant="h3">Question of the Day</DrText>
              <DrText
                className="text-muted mt-2"
                style={{ textAlign: "center" }}
              >
                Solve today’s curated problem to stay consistent.
              </DrText>
              <DrButton onClick={navigateToQOD} leadingIcon="arrow_right" variant="outline"></DrButton>
            </div>

            <div
              className="card flex flex-col items-center gap-4"
              style={{ flex: 1 }}
            >
              <DrIcon name="side_brain" size="m" />
              <DrText variant="h3">Theory of the Day</DrText>
              <DrText
                className="text-muted mt-2"
                style={{ textAlign: "center" }}
              >
                Learn one important concept deeply every day.
              </DrText>
              <DrButton onClick={openTOD} leadingIcon="arrow_right" variant="outline"></DrButton>
            </div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex-1 flex flex-col gap-4">
          <div
            className="card flex justify-between items-center"
            onClick={() => navigate("/topics")}
          >
            <div className="flex items-center justify-center gap-4">
              <DrIcon name="book" size="m" />
              <span>Topics</span>
            </div>
            <DrIcon name="arrow_right" size="m" />
          </div>

          <div
            className="card flex justify-between items-center"
            onClick={() => navigate("/questions")}
          >
            <div className="flex items-center justify-center gap-4">
              <DrIcon name="question_mark" size="m" />
              <span>Questions</span>
            </div>
            <DrIcon name="arrow_right" size="m" />
          </div>

          <div
            className="card flex justify-between items-center"
            onClick={() => navigate("/theories")}
          >
            <div className="flex items-center justify-center gap-4">
              <DrIcon name="side_brain" size="m" />
              <span>Theories</span>
            </div>
            <DrIcon name="arrow_right" size="m" />
          </div>
        </div>
      </div>

      {/* ================= DASHBOARD ================= */}
    </div>)
  );
}
