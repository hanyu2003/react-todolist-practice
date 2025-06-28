export default function AddAct({
    formData,
    formType,      // 'add_data' or 'edit_data'
    dispatch,
    onSubmit,      // ADD_ACT or SAVE_ACT
    onCancel,
}) {
    return (
        <div className="space-y-4">
            {/* 標題 */}
            <input
                type="text"
                placeholder="活動標題"
                value={formData.title}
                onChange={e =>
                dispatch({
                    type: 'UPDATE_FIELD',
                    form: formType,
                    field: 'title',
                    value: e.target.value,
                })
                }
                className="w-full border p-2 rounded"
            />

            {/* 動態場次 */}
            {formData.sessions.map((s, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                <input
                    type="date"
                    value={s.date}
                    onChange={e =>
                    dispatch({
                        type: 'UPDATE_FIELD',
                        form: formType,
                        index: idx,
                        field: 'date',
                        value: e.target.value,
                    })
                    }
                    className="flex-1 border p-2 rounded"
                />
                <input
                    type="time"
                    value={s.time}
                    onChange={e =>
                    dispatch({
                        type: 'UPDATE_FIELD',
                        form: formType,
                        index: idx,
                        field: 'time',
                        value: e.target.value,
                    })
                    }
                    className="flex-1 border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="活動地點"
                    value={s.location}
                    onChange={e =>
                    dispatch({
                        type: 'UPDATE_FIELD',
                        form: formType,
                        index: idx,
                        field: 'location',
                        value: e.target.value,
                    })
                    }
                    className="flex-1 border p-2 rounded"
                />
                {idx > 0 && (
                    <button
                    onClick={() =>
                        dispatch({ type: 'REMOVE_SESSION', form: formType, index: idx })
                    }
                    className="text-red-500 hover:underline"
                    >
                    刪除
                    </button>
                )}
                </div>
            ))}
            <button
                onClick={() =>
                dispatch({ type: 'ADD_SESSION', form: formType })
                }
                className="text-blue-600 hover:underline"
            >
                ＋ 新增場次
            </button>

            {/* 活動說明 */}
            <textarea
                placeholder="活動說明"
                value={formData.detail}
                onChange={e =>
                dispatch({
                    type: 'UPDATE_FIELD',
                    form: formType,
                    field: 'detail',
                    value: e.target.value,
                })
                }
                className="w-full border p-2 rounded h-24"
            />

            {/* 報名網址 */}
            <input
                type="url"
                placeholder="報名網址"
                value={formData.registerUrl}
                onChange={e =>
                dispatch({
                    type: 'UPDATE_FIELD',
                    form: formType,
                    field: 'registerUrl',
                    value: e.target.value,
                })
                }
                className="w-full border p-2 rounded"
            />

            {/* 提交 / 取消 */}
            <div className="flex justify-end gap-3 pt-2">
                <button
                    onClick={onSubmit}
                    disabled={!formData.title.trim()}
                    className={`
                    text-white px-4 py-2 rounded disabled:opacity-50
                    ${formType === 'add_data'
                        ? 'bg-fuchsia-600 hover:bg-fuchsia-700'
                        : 'bg-green-500 hover:bg-green-600'}
                    `}
                >
                    {formType === 'add_data' ? '新增活動' : '儲存編輯'}
                </button>
                <button
                    onClick={onCancel}
                    className="text-gray-500 hover:underline"
                >
                    取消
                </button>
            </div>

        </div>
    )
}
