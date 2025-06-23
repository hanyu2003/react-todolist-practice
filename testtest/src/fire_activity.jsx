import ActivityList from "./components/ActivityList";

export default function App() {
  const sampleActivities = [
    {
      id: 1,
      title: "火舞體驗日",
      description: "新生體驗火舞技巧，無需經驗，歡迎來玩！",
      date: "2025-07-15",
      location: "操場後方草地"
    },
    {
      id: 2,
      title: "迎新表演",
      description: "火舞社公開表演，參與者優先錄取下學期演出",
      date: "2025-08-01",
      location: "學生活動中心"
    }
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🔥 活動公布 / 報名區</h1>
      <ActivityList activities={sampleActivities} />
    </div>
  );
}
