export default function ActivityList({ activities }) {
  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <div key={activity.id} className="border rounded-lg p-4 shadow bg-white">
          <h2 className="text-xl font-bold text-gray-800">{activity.title}</h2>
          <p className="text-sm text-gray-600">{activity.description}</p>
          <p className="text-sm text-gray-500 mt-2">🗓 日期：{activity.date}</p>
          <p className="text-sm text-gray-500">📍 地點：{activity.location}</p>
          <button className="mt-4 px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded">
            我要報名
          </button>
        </div>
      ))}
    </div>
  );
}
