import { useRef, useEffect, useState } from 'react'

export default function ActivityItem({activity,dispatch,onDelete,onEdit,}) {
    const { id, title, sessions, detail, registerUrl, expanded, publishedAt } = activity

    const detailRef = useRef(null)
    const [isClamped, setIsClamped] = useState(false)

    // 輔助函式：把 date+time 轉 timestamp
    const toTs = s =>new Date(`${s.date}T${s.time || '00:00'}`).getTime();

    useEffect(() => {
        const el = detailRef.current
        if (!el) return

        const lineHeight = parseFloat(getComputedStyle(el).lineHeight)
        const maxLines = 2
        const maxHeight = lineHeight * maxLines

        if (el.scrollHeight > maxHeight + 2) {
        setIsClamped(true)
        }
    }, [])

    return (
        <div className="border p-7 rounded-xl shadow-sm space-y-4">
        {/* 標題 + 報名連結 */}
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{title}</h2>
            {registerUrl && (
            <a
                href={registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm px-4 py-1 rounded hover:underline transition"
            >
                報名連結
            </a>
            )}
        </div>

        {/* 發布時間 */}
        <p className="text-sm text-gray-500">📢 發布時間：{publishedAt}</p>

         {/* 場次列表 */}
        <div className="space-y-2">
            {sessions.map(s => {
            const isPast = toTs(s) < Date.now();

            return (
                <div
                    key={s.sessionId}
                    className={`flex justify-between p-2 rounded-xl 
                        ${isPast ? 'bg-gray-100' : 'bg-green-50'}`}
                >
                    <div className="space-y-1">
                        <p
                        className={`flex items-center ${
                            isPast ? 'line-through text-gray-400' : ''
                        }`}
                        >
                        🗓️ {s.date} {s.time && `| ${s.time}`}
                        </p>
                        <p
                        className={`flex items-center ${
                            isPast ? 'line-through text-gray-400' : ''
                        }`}
                        >
                        📍 {s.location}
                        </p>
                    </div>
                </div>
            );
            })}
        </div>

        {/* 活動說明 */}
        <div className="text-gray-700 whitespace-pre-wrap">
            <div
            ref={detailRef}
            className={expanded ? '' : 'line-clamp-2'}
            >
            {detail}
            </div>

            {isClamped && (
            <button
                onClick={() => dispatch({ type: 'SET_EXPANDED', id })}
                className="text-sm text-blue-600 mt-2 hover:underline"
            >
                {expanded ? '顯示較少' : '顯示更多'}
            </button>
            )}
        </div>

        {/* 刪除 / 編輯 按鈕區 */}
        <div className="mt-4 flex justify-center space-x-4">
            <button
            onClick={onDelete}
            className="bg-red-400 hover:bg-red-500 px-4 py-1 rounded text-sm text-white"
            >
            刪除活動
            </button>
            
            {onEdit && (
                <button
                onClick={onEdit}
                className="bg-blue-400 hover:bg-blue-500 px-4 py-1 rounded text-sm text-white"
                >
                編輯活動
                </button>
            )}
        </div>
        </div>
    )
}
