import { useReducer } from 'react'
import ActivityItem from './ActivityItem'
import AddAct from './AddActivity'

const initialState = {
    activities: [
        {
        id: 1,
        title: '拍攝宣傳片',
        publishedAt: '2025-06-03 14:00',
        sessions: [
            { sessionId: 11, date: '2025-06-02', time: '', location: '新月沙灣'},
            { sessionId: 12, date: '2025-07-19', time: '', location: '中正橋下'},
        ],
        detail: `🔊 各位～我們暑假有安排兩天的時間來拍攝宣傳片📸
地點在新月沙灣🏝️ 和中正橋下🌉
歡迎各位來玩玩～幹部跟老人都可以來喔～🤩✨

因為我們會用大家的大成舞序進行拍攝，所以儘量以一隻舞為單位團報，
有少人沒關係，能來就來～要來的填報名表單＋1!`,
        expanded: false,
        registerUrl: 'https://www.youtube.com/',
        },
        
        {
        id: 2,
        title: '官網成果發表',
        publishedAt: '2025-06-01 14:00',
        sessions: [
            { sessionId: 21, date: '2025-07-01', time: '22:00', location: 'https://meet.google.com/zja-kksk-dwe'},
        ],
        detail: `嗨大家～這裡是火舞社技術部！
這個學期在大家準備大成的同時，我們也默默開始準備一個給社團的小驚喜──
我們自己設計的官方網站🎉

雖然還有很長的路要走，但已有初步成果，
現在打算辦一場線上發表會，邀請對我們作品有興趣的你一起來聽介紹～`,
        registerUrl: 'https://www.youtube.com/',
        expanded: false,
        },

        {
        id: 3,
        title: '期末大會',
        publishedAt: '2025-06-02 14:00',
        sessions: [
            { sessionId: 31, date: '2025-07-12', time: '19:00', location: '工六205'},
        ],
        detail: `@每個人我們今天7點在工六205有期末大會，有提供pizza和烤雞還有飲料喔！！！歡迎大家來唷`,
        expanded: false,
        registerUrl: 'https://www.youtube.com/',
        },

        {
        id: 4,
        title: '我是過期的活動',
        publishedAt: '2025-05-02 14:00',
        sessions: [
            { sessionId: 41, date: '2025-06-12', time: '19:00', location: '工六205'},
        ],
        detail: `@每個人我們今天7點在工六205有期末大會，有提供pizza和烤雞還有飲料喔！！！歡迎大家來唷`,
        expanded: false,
        registerUrl: 'https://www.youtube.com/',
        },

        {
        id: 5,
        title: '我是過期的活動2',
        publishedAt: '2025-05-05 14:00',
        sessions: [
            { sessionId: 41, date: '2025-06-15', time: '19:00', location: '工六205'},
        ],
        detail: `@每個人我們今天7點在工六205有期末大會，有提供pizza和烤雞還有飲料喔！！！歡迎大家來唷`,
        expanded: false,
        registerUrl: 'https://www.youtube.com/',
        },
    ],
    
    // 新增用表單
    add_data: {
        title: '',
        detail: '',
        registerUrl: '',
        sessions: [{ date: '', time: '', location: '' }],
    },
    // 編輯用表單
    edit_data: {
        title: '',
        detail: '',
        registerUrl: '',
        sessions: [{ date: '', time: '', location: '' }],
    },
    isAdding: false,
    isEditing: false,
    editingId: null,
    sortBy: 'published',
}

const getNextSessionTime = act => {
  const now = Date.now()
  // 1. 轉成 timestamp，並過濾掉已過的
  const futureTs = act.sessions
    .map(s => new Date(`${s.date}T${s.time || '00:00'}`).getTime())
    .filter(ts => ts > now)

  // 2. 如果有未來場次，就回最小值；沒的話回 Infinity（排最後）
  return futureTs.length
    ? Math.min(...futureTs)
    : Infinity
}

function reducer(state, action) {
    switch (action.type) {
        // 展開/收合 activity detail
        case 'SET_EXPANDED':
            return {
                ...state,
                activities: state.activities.map(act =>
                act.id === action.id
                    ? { ...act, expanded: !act.expanded }
                    : act
                ),
            }

        // 通用欄位更新，支援 add_data 或 edit_data
        case 'UPDATE_FIELD':
            const { form, field, value, index } = action
            // sessions 裡的某筆
            if (index != null) {
                const list = state[form].sessions.map((s, i) =>
                i === index ? { ...s, [field]: value } : s
                )
                return { ...state, [form]: { ...state[form], sessions: list } }
            }
            // 一般欄位
            return {
                ...state,
                [form]: { ...state[form], [field]: value },
            }

        // 新增/移除 session（add_data 或 edit_data 都可用）
        case 'ADD_SESSION':
            return {
                ...state,
                [action.form]: {
                ...state[action.form],
                sessions: [
                    ...state[action.form].sessions,
                    { date: '', time: '', location: '' },
                ],
                },
            }
        case 'REMOVE_SESSION':
            return {
                ...state,
                [action.form]: {
                ...state[action.form],
                sessions: state[action.form].sessions.filter(
                    (_, i) => i !== action.index
                ),
                },
            }

        // 切換「新增」模式
        case 'TOGGLE_ADD_MODE':
            return {
                ...state,
                isAdding: !state.isAdding,
                isEditing: false,         // ← 關閉編輯
                editingId: null,
            }
        // 確認新增
        case 'ADD_ACT':
            if (!state.add_data.title.trim()) return state
            // 過濾掉全空 session
            const goodAddSess = state.add_data.sessions.filter(
                s => s.date || s.time || s.location
            )
            const newAct = {
                id: Date.now(),
                title: state.add_data.title,
                publishedAt: new Date().toLocaleString(),
                detail: state.add_data.detail,
                registerUrl: state.add_data.registerUrl,
                sessions: goodAddSess.map((s, i) => ({
                sessionId: Date.now() + i + 1,
                date: s.date,
                time: s.time,
                location: s.location,
                })),
                expanded: false,
            }
            return {
                ...state,
                activities: [newAct, ...state.activities],
                add_data: initialState.add_data,
                isAdding: false,
            }

        // 切換「編輯」模式，並把某筆活動資料匯入 edit_data
        case 'START_EDIT':
            const act = state.activities.find(a => a.id === action.id)
            return {
                ...state,
                isEditing: true,
                editingId: act.id,
                isAdding: false,
                edit_data: {
                title: act.title,
                detail: act.detail,
                registerUrl: act.registerUrl,
                // 深拷貝 sessions 資料
                sessions: act.sessions.map(s => ({
                    date: s.date,
                    time: s.time,
                    location: s.location,
                })),
                },
            }
        // 取消編輯
        case 'CANCEL_EDIT':
            return {
                ...state,
                isEditing: false,
                editingId: null,
                // 重置 edit_data
                edit_data: initialState.edit_data,
            }
        // 儲存編輯
        case 'SAVE_ACT':
            if (!state.edit_data.title.trim()) return state
            const goodEditSess = state.edit_data.sessions.filter(
                s => s.date || s.time || s.location
            )
            return {
                ...state,
                activities: state.activities.map(a =>
                a.id === state.editingId
                    ? {
                        ...a,
                        title: state.edit_data.title,
                        detail: state.edit_data.detail,
                        registerUrl: state.edit_data.registerUrl,
                        sessions: goodEditSess.map((s, i) => ({
                        sessionId: Date.now() + i + 1,
                        date: s.date,
                        time: s.time,
                        location: s.location,
                        })),
                    }
                    : a
                ),
                isEditing: false,
                editingId: null,
                edit_data: initialState.edit_data,
            }

        // 設定排序模式
        case 'SET_SORT':
            return {
                ...state,
                sortBy: action.sortBy,
            }


        // 刪除活動
        case 'DELETE_ACT':
            return {
                ...state,
                activities: state.activities.filter(a => a.id !== action.id),
            }

        default:
        return state
    }
}

export default function ActivityList() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {
        activities,
        add_data,
        edit_data,
        isAdding,
        isEditing,
        editingId,
        sortBy,
    } = state

    const sortedActivities = [...activities].sort((a, b) => {
        if (sortBy === 'published') {
            return new Date(b.publishedAt) - new Date(a.publishedAt)
        } else {
            // 活動時間排序：比最接近現在的未來場次
            return getNextSessionTime(a) - getNextSessionTime(b)
        }
    })

    const upcoming = sortedActivities.filter(a => getNextSessionTime(a) !== Infinity)
    const expired  = sortedActivities.filter(a => getNextSessionTime(a) === Infinity)



    return (
        <div className="space-y-6 max-w-2xl mx-auto">

            {/* 排序按鈕：置中顯示 */}
            <div className="flex justify-center space-x-4 mb-4">
                <button
                onClick={() => dispatch({ type: 'SET_SORT', sortBy: 'published' })}
                className={`px-4 py-2 rounded ${
                    sortBy === 'published'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                >
                照公布時間排序
                </button>
                <button
                onClick={() => dispatch({ type: 'SET_SORT', sortBy: 'activity' })}
                className={`px-4 py-2 rounded ${
                    sortBy === 'activity'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                >
                照活動時間排序
                </button>
            </div>

            {/* + 新增 / ❌ 取消新增 */}
            <button
                onClick={() => dispatch({ type: 'TOGGLE_ADD_MODE' })}
                className="px-4 py-2 rounded text-white bg-fuchsia-500 hover:bg-fuchsia-600 disabled:opacity-50"
                // disabled={isEditing}
            >
                {isAdding ? '取消新增' : '新增活動'}
            </button>

            {/* 新增表單 */}
            {isAdding && (
                <div className="bg-gray-50 border rounded-xl p-4 space-y-4">
                <AddAct
                    formData={add_data}
                    formType="add_data"
                    dispatch={dispatch}
                    onSubmit={() => dispatch({ type: 'ADD_ACT' })}
                    onCancel={() => dispatch({ type: 'TOGGLE_ADD_MODE' })}
                />
                </div>
            )}

            {/* 活動列表或編輯表單 */}
            {upcoming.map(act =>
                isEditing && act.id === editingId ? (
                <div
                    key={act.id}
                    className="bg-yellow-50 border rounded-xl p-4 space-y-4"
                >
                    <h2 className="text-lg font-bold text-yellow-700">
                    編輯活動
                    </h2>
                    <AddAct
                    formData={edit_data}
                    formType="edit_data"
                    dispatch={dispatch}
                    onSubmit={() => dispatch({ type: 'SAVE_ACT' })}
                    onCancel={() => dispatch({ type: 'CANCEL_EDIT' })}
                    />
                </div>
                ) : (
                <ActivityItem
                    key={act.id}
                    activity={act}
                    onDelete={() => dispatch({ type: 'DELETE_ACT', id: act.id })}
                    onEdit={() => dispatch({ type: 'START_EDIT',  id: act.id })}
                    dispatch={dispatch}
                    />
                )
            )}

            {expired.length > 0 && (
            <div className="pt-8">
                <h2 className="text-lg font-semibold text-gray-500 mb-4">
                 ================================================
                 ————————————— 已過期的活動 ——————————————
                </h2>
                {expired.map(act => (
                <ActivityItem
                    key={act.id}
                    activity={act}
                    onDelete={() => dispatch({ type: 'DELETE_ACT', id: act.id })}
                    dispatch={dispatch}
                />
                ))}
            </div>
            )}

        </div>
    )
}