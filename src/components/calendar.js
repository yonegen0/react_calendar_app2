import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import usePlanState from '../hooks/usePlanState';
import { useNavigate } from 'react-router-dom';

// Calendar コンポーネントの定義
const Calendar = () => {
  // usePlanState フックから必要な状態と関数を取得
  const {
    WEB_API_URL,
    items,
    setItems
  } = usePlanState();

  // インスタンスを作成（ページ遷移のため）
  const navigate = useNavigate();

  // /get_user を呼び出す処理
  const callGetUserApi = () => {
    fetch(`${WEB_API_URL}/get_user`, {
      mode: 'cors',
      method: 'GET'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response)
        }
        return response.json(); // レスポンスが OK なら JSON を解析して次の .then に渡す
      })
      .then(data => {
        if (data) {
          setItems(data); // 取得した data を items state に設定
        }
      })
      .catch(e => {
        console.error('Error calling:', e);
      });
  };

  useEffect(() => {
    // データベースの情報取得
    callGetUserApi();
  }, []);
  // カレンダーの日付がクリックされた時の処理
  const handleDateClick = (info) => {
    // "/plan" ページへ遷移
    navigate(`/plan?date=${info.dateStr}`);
  };

  // 予定の配列 (items) を FullCalendar が認識できるイベントオブジェクトの配列に変換
  const calendarEvents = items.map(item => ({
    // イベントのタイトルは予定のテキスト
    title: item.text,
    // イベントの開始日は予定の日付
    start: item.date
  }));

  // Calendar コンポーネントのレンダリング
  return (
    <FullCalendar
      // 使用するプラグインを指定（日付グリッド、時間グリッド、インタラクション）
      plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
      // 初期表示のビューを週表示に設定
      initialView="dayGridWeek"
      // カレンダーのロケールを日本語に設定
      locale={jaLocale}
      // カレンダーのヘッダーツールバーの設定
      headerToolbar={{
        // 左側に「前」「次」ボタンを表示
        left: 'prev,next',
        // 中央に日付を表示
        center: 'title',
        // 右側に表示形式の切り替えボタンを表示（年、週、日）
        right: 'dayGridYear,dayGridWeek,timeGridDay'
      }}
      // タイトルの表示形式を設定
      titleFormat={{
        year: 'numeric', // 年を4桁で表示
        month: 'numeric', // 月を数値で表示
        day: 'numeric'   // 日を数値で表示
      }}
      // 日付クリック時のイベントハンドラーを設定
      dateClick={handleDateClick} // dateClick イベントハンドラーを更新
      // イベントクリック時のイベントハンドラーを設定（アラートでイベントタイトルを表示）
      eventClick={(info) => alert(`イベント: ${info.event.title}`)}
      // カレンダーに表示するイベントデータを設定
      events={calendarEvents}
    />
  );
};

// Calendar コンポーネントをエクスポート
export default Calendar;