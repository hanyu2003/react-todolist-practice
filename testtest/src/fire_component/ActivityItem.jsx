import { useRef, useEffect, useState } from 'react'


export default function ActivityItem({ activity , dispatch }) {
    const { id, title, sessions, detail, registerUrl, expanded, publishedAt } = activity;
    
///////////////////////////////////////////////////////
    const detailRef = useRef(null);
    const [isClamped, setIsClamped] = useState(false); // 🆕 判斷是否超過 2 行
    useEffect(() => {
        const el = detailRef.current;
        if (!el) return;

        const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
        const maxLines = 2;
        const maxHeight = lineHeight * maxLines;

        if (el.scrollHeight > maxHeight + 2) {
        setIsClamped(true);
        }
    }, []);
///////////////////////////////////////////////////////


  return (
    <div className="border p-7 rounded-xl shadow-sm space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-sm text-gray-500">📢 發布時間：{publishedAt}</p>
            {registerUrl && (
                <a
                href={registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 text-white text-sm px-4 py-1 rounded hover:bg-blue-600 transition"
                >
                報名連結
                </a>
            )}
            </div>

        {/* 場次列表 */}
        <div className="space-y-2">
            {sessions.map(s => (
            <div key={s.sessionId} className="flex justify-between bg-gray-100 p-1 rounded-xl">
                <div>
                <p>🗓️ {s.date} {s.time && `| ${s.time}`}</p>
                <p>📍 {s.location}</p>
                </div>
            </div>
            ))}
        </div>


        {/* 活動說明 detail，多行顯示 */}
        <div className="text-gray-700 whitespace-pre-wrap relative">
            <div 
                ref={detailRef}
                className={expanded ? '' : 'line-clamp-2'}
            >
                {detail}
            </div>

            {/* ✅ 只有在文字太多的情況下才顯示切換按鈕 */}
            {isClamped && (
                <button
                onClick={() => dispatch({ type: 'SET_EXPANDED', id })}
                className="text-sm text-blue-600 mt-2 hover:underline"
                >
                {expanded ? '顯示較少' : '顯示更多'}
                </button>
            )}
        </div>

    </div>
  )
}

