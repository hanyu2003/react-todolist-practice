import { useReducer } from 'react'
import ActivityItem from './ActivityItem'

const initialState = {
    activities: [
        {
        id: 1,
        title: '拍攝宣傳片',
        publishedAt: '2025-06-01 14:00',
        sessions: [
            { sessionId: 11, date: '2025-07-12', time: '', location: '新月沙灣'},
            { sessionId: 12, date: '2025-07-19', time: '', location: '中正橋下'},
        ],
        detail: `🔊 各位～我們暑假有安排兩天的時間來拍攝宣傳片📸
地點在新月沙灣🏝️ 和中正橋下🌉
歡迎各位來玩玩～幹部跟老人都可以來喔～🤩✨

因為我們會用大家的大成舞序進行拍攝，所以儘量以一隻舞為單位團報，
有少人沒關係，能來就來～要來的填報名表單＋1!`,
        expanded: false,
        registerUrl: 'https://www.youtube.com/watch?v=NUUjcHSzV1g',
        },
        
        {
        id: 2,
        title: '官網成果發表',
        publishedAt: '2025-06-01 14:00',
        sessions: [
            { sessionId: 21, date: '2025-06-30', time: '22:00', location: 'https://meet.google.com/zja-kksk-dwe'},
        ],
        detail: `嗨大家～這裡是火舞社技術部！
這個學期在大家準備大成的同時，我們也默默開始準備一個給社團的小驚喜──
我們自己設計的官方網站🎉

雖然還有很長的路要走，但已有初步成果，
現在打算辦一場線上發表會，邀請對我們作品有興趣的你一起來聽介紹～`,
        registerUrl: 'https://www.youtube.com/watch?v=NUUjcHSzV1g',
        expanded: false,
        },

        {
        id: 3,
        title: '期末大會',
        publishedAt: '2025-06-01 14:00',
        sessions: [
            { sessionId: 31, date: '2025-06-12', time: '19:00', location: '工六205'},
        ],
        detail: `@每個人我們今天7點在工六205有期末大會，有提供pizza和烤雞還有飲料喔！！！歡迎大家來唷`,
        expanded: false,
        registerUrl: 'https://www.youtube.com/watch?v=NUUjcHSzV1g',
        },
    ]
}

function reducer(state, action) {
    switch (action.type) {
        case 'SET_EXPANDED': 
        return {
            ...state,
            activities: state.activities.map((act) => 
                act.id === action.id 
                    ? { ...act, expanded: !act.expanded } 
                    : act
            ),
        };

        default:
            return state;
    }
}

export default function ActivityList() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { activities } = state;
    

    return (
        <div className="space-y-6">
        {activities.map(act => (
            <ActivityItem key={act.id} activity={act} dispatch={dispatch}/>
        ))}
        </div>
    )
}
