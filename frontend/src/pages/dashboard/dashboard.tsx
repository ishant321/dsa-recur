import { useEffect, useMemo, useState } from "react";
import "./index.scss";
import { request } from "../../api/request";
import type { Question, Topic } from "../../types";
import type {
  LeastRevisedQuestionDto,
  MostRevisedQuestionDto,
  Summary,
  WeakTopicDto,
} from "./types";
import DrText from "../../components/dr_text";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import DrButton from "../../components/dr_button";
import { v4 } from "uuid";

export default function Dashboard() {
  const dashboardBaseURL = import.meta.env.VITE_DASHBOARD_API_URL;

  const [ resetLoadingKey, setResetLoadingKey ] = useState(v4());

  const [summary, setSummary] = useState<Summary | null>(null);

  const [weakTopics, setWeakTopics] = useState<WeakTopicDto[]>([]);

  const [mostRevisedQuestions, setMostRevisedQuestions] = useState<
    MostRevisedQuestionDto[]
  >([]);

  const [leastRevisedQuestions, setLeastRevisedQuestions] = useState<
    LeastRevisedQuestionDto[]
  >([]);

  const [activity, setActivity] = useState(0);

  const [topics, setTopics] = useState<Topic[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 2);
    setResetLoadingKey(v4());
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 2) % 2);
    setResetLoadingKey(v4());
  };

  //--------------------------------------------------
  // Dashboard APIs
  //--------------------------------------------------

  const getDashboardSummary = async () => {
    const response = await request<Summary>({
      baseURL: dashboardBaseURL,
      method: "GET",
      url: "/summary",
    });

    setSummary(response.data);
  };

  const getWeakTopics = async () => {
    const response = await request<WeakTopicDto[]>({
      baseURL: dashboardBaseURL,
      method: "GET",
      url: "/weak_topics",
    });

    setWeakTopics(response.data ?? []);
  };

  const getMostRevisedQuestions = async () => {
    const response = await request<MostRevisedQuestionDto[]>({
      baseURL: dashboardBaseURL,
      method: "GET",
      url: "/most_revised_questions",
    });

    setMostRevisedQuestions(response.data ?? []);
  };

  const getLeastRevisedQuestions = async () => {
    const response = await request<LeastRevisedQuestionDto[]>({
      baseURL: dashboardBaseURL,
      method: "GET",
      url: "/least_revised_questions",
    });

    setLeastRevisedQuestions(response.data ?? []);
  };

  const getActivity = async () => {
    const response = await request<number>({
      baseURL: dashboardBaseURL,
      method: "GET",
      url: "/activity",
    });

    setActivity(response.data ?? 0);
  };

  //--------------------------------------------------
  // Existing APIs
  //--------------------------------------------------

  const getAllTopics = async () => {
    const response = await request<Topic[]>({
      method: "GET",
      url: "/topics",
    });

    setTopics(response.data ?? []);
  };

  const getAllQuestions = async () => {
    const response = await request<Question[]>({
      method: "GET",
      url: "/all_questions",
    });

    setQuestions(response.data ?? []);
  };

  useEffect(() => {
    void Promise.all([
      getDashboardSummary(),
      getWeakTopics(),
      getMostRevisedQuestions(),
      getLeastRevisedQuestions(),
      getActivity(),
      getAllTopics(),
      getAllQuestions(),
    ]);
  }, []);

  //--------------------------------------------------
  // Maps
  //--------------------------------------------------

  const topicsMap = useMemo(() => {
    return new Map(topics.map((topic) => [topic.id, topic.name]));
  }, [topics]);

  const questionsMap = useMemo(() => {
    return new Map(questions.map((q) => [q.id, q.title]));
  }, [questions]);

  //--------------------------------------------------
  // Chart Data
  //--------------------------------------------------

  const weakTopicsData = useMemo(() => {
    return weakTopics.map((topic) => ({
      name: topicsMap.get(topic.topicId) ?? `Topic ${topic.topicId}`,
      days: Math.floor(
        (Date.now() - new Date(topic.lastVisited).getTime()) /
          (1000 * 60 * 60 * 24),
      ),
    }));
  }, [weakTopics, topicsMap]);

  const mostRevisedData = useMemo(() => {
    return mostRevisedQuestions.map((q) => ({
      name: questionsMap.get(q.questionId) ?? `Question ${q.questionId}`,
      revisions: q.revisionCount,
    }));
  }, [mostRevisedQuestions, questionsMap]);

  const leastRevisedData = useMemo(() => {
    return leastRevisedQuestions.map((q) => ({
      name: questionsMap.get(q.questionId) ?? `Question ${q.questionId}`,
      revisions: q.revisionCount,
    }));
  }, [leastRevisedQuestions, questionsMap]);

  const activityData = [
    {
      name: "today",
      value: Math.min(activity, 20),
      fill: "var(--primary)",
    },
  ];

  const summaryCards = [
    {
      title: "Today's Revisions",
      value: summary?.todayRevisionCount ?? 0,
    },
    {
      title: "Current Streak",
      value: summary?.currentStreak ?? 0,
    },
    {
      title: "Topics Covered",
      value: summary?.topicsCovered ?? 0,
    },
    {
      title: "Questions Revised",
      value: summary?.questionsRevised ?? 0,
    },
    {
      title: "Notes Revised",
      value: summary?.notesRevised ?? 0,
    },
    {
      title: "Theories Revised",
      value: summary?.theoriesRevised ?? 0,
    },
    {
      title: "Total Revisions",
      value: summary?.totalRevisions ?? 0,
    },
    {
      title: "Most Revised Topic",
      value: topicsMap.get(summary?.mostRevisedTopic ?? -1) ?? "-",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 w-full">
      {/* SUMMARY */}

      <div className="flex flex-row gap-4 justify-center">
        {summaryCards.map((card) => (
          <div key={card.title} className="card summary-card">
            <DrText variant="small" color="subdued">
              {card.title}
            </DrText>

            <div className="summary-value">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-slider gap-4">
        <div className="dashboard-slider__header">
          <DrButton
            variant="outline"
            leadingIcon="arrow_left"
            resetLoadingKey={resetLoadingKey}
            onClick={prevSlide}
          />

          <DrText variant="h2">Dashboard Analytics</DrText>

          <DrButton
            variant="outline"
            leadingIcon="arrow_right"
            resetLoadingKey={resetLoadingKey}
            onClick={nextSlide}
          />
        </div>

        {currentSlide === 0 && (
          <div className="flex flex-row gap-4 flex-1" style={{ minHeight: 0 }}>
            <div
              className="card dashboard-card flex flex-col flex-1"
              style={{ minHeight: 0 }}
            >
              <DrText variant="h3">Today's Activity</DrText>

              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    data={activityData}
                    innerRadius="70%"
                    outerRadius="100%"
                    startAngle={90}
                    endAngle={-270}
                  >
                    <PolarAngleAxis
                      type="number"
                      domain={[0, 20]}
                      tick={false}
                    />
                    <RadialBar dataKey="value" cornerRadius={10} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>

              <DrText className="text-center" variant="small">
                {activity} revisions today
              </DrText>
            </div>
            {/* Weak Topics */}

            <div
              className="card dashboard-card flex flex-col flex-1"
              style={{ minHeight: 0 }}
            >
              <DrText variant="h3">Weak Topics</DrText>

              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weakTopicsData}
                    layout="vertical"
                    margin={{
                      top: 10,
                      right: 20,
                      left: 40,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid stroke="var(--border)" horizontal={false} />

                    <XAxis type="number" tick={{ fill: "#999" }} />

                    <YAxis
                      dataKey="name"
                      type="category"
                      width={120}
                      tick={{ fill: "#ddd" }}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="days"
                      fill="var(--primary)"
                      radius={[0, 8, 8, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ROW 2 */}
        {currentSlide === 1 && (
          <div className="flex flex-row gap-4 flex-1" style={{ minHeight: 0 }}>
            {/* MOST REVISED */}

            <div
              className="card dashboard-card flex flex-col flex-1"
              style={{ minHeight: 0 }}
            >
              <DrText variant="h3">Most Revised Questions</DrText>

              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mostRevisedData}
                    layout="vertical"
                    margin={{
                      top: 10,
                      right: 20,
                      left: 40,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid stroke="var(--border)" horizontal={false} />

                    <XAxis type="number" tick={{ fill: "#999" }} />

                    <YAxis
                      dataKey="name"
                      type="category"
                      width={150}
                      tick={{ fill: "#ddd" }}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="revisions"
                      fill="var(--primary)"
                      radius={[0, 8, 8, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* LEAST REVISED */}

            <div
              className="card dashboard-card flex flex-col flex-1"
              style={{ minHeight: 0 }}
            >
              <DrText variant="h3">Least Revised Questions</DrText>

              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={leastRevisedData}
                    layout="vertical"
                    margin={{
                      top: 10,
                      right: 20,
                      left: 40,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid stroke="var(--border)" horizontal={false} />

                    <XAxis type="number" tick={{ fill: "#999" }} />

                    <YAxis
                      dataKey="name"
                      type="category"
                      width={150}
                      tick={{ fill: "#ddd" }}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="revisions"
                      fill="var(--primary)"
                      radius={[0, 8, 8, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
