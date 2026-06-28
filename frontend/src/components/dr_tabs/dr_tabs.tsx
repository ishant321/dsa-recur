import DrText from "../dr_text";
import "./index.scss";

interface DrTabProps {
  tabs: { label: string; id: string }[];
  activeTab: string;
  onChange: (tab: string) => void;
  style?: React.CSSProperties;
}

export default function DrTab({
  tabs,
  activeTab,
  onChange,
  style,
}: DrTabProps) {
  return (
    <div className="dr-tab" style={style}>
      {tabs.map((tab) => (
        <div key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`dr-tab__item ${
              activeTab === tab.id ? "dr-tab__item--active" : ""
            }`}>
          <DrText>
            {tab.label}
          </DrText>
        </div>
      ))}
    </div>
  );
}
