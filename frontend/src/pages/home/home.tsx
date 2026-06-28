import "./index.scss";
import DrButton from "../../components/dr_button";
import DrIcon from "../../components/dr_icon";
import DrText from "../../components/dr_text";

export default function Home() {
  return (
    <div className="home">
      {/* ================= TOP ================= */}

      {/* ================= HOME ================= */}

      {/* ================= MIDDLE ================= */}
      <div className="flex flex-row p-6 items-center justify-center gap-6 w-full">
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
      </div>

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

      {/* ================= BOTTOM ================= */}
      <div className="flex h-full w-full flex-1 items-center px-6 gap-6">
        {/* ================= LEFT ================= */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex gap-4 mt-3">
            <div className="card" style={{ flex: 1 }}>
              <h3>📌 Question of the Day</h3>
              <p className="text-muted mt-2">
                Solve today’s curated problem to stay consistent.
              </p>
            </div>

            <div className="card" style={{ flex: 1 }}>
              <h3>🧠 Theory of the Day</h3>
              <p className="text-muted mt-2">
                Learn one important concept deeply every day.
              </p>
            </div>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div
          style={{
            width: "1px",
            background: "var(--border)",
            height: "100%",
          }}
        />

        {/* ================= RIGHT ================= */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="card flex justify-between items-center">
            <div className="flex items-center justify-center gap-4">
              <DrIcon name="book" size="m" />
              <span>Topics</span>
            </div>
            <span style={{ color: "var(--primary)" }}>→</span>
          </div>

          <div className="card flex justify-between items-center">
            <div className="flex items-center justify-center gap-4">
              <DrIcon name="question_mark" size="m" />
              <span>Questions</span>
            </div>
            <span style={{ color: "var(--primary)" }}>→</span>
          </div>

          <div className="card flex justify-between items-center">
            <div className="flex items-center justify-center gap-4">
              <DrIcon name="side_brain" size="m" />
              <span>Theories</span>
            </div>
            <span style={{ color: "var(--primary)" }}>→</span>
          </div>
        </div>
      </div>

      {/* ================= DASHBOARD ================= */}
    </div>
  );
}
