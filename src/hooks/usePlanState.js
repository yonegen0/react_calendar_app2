import { useState, useCallback } from 'react';

// カスタムフック usePlanState の定義
const usePlanState = () => {
  // 日付のuseState の定義
  const [date, setDate] = useState('');
  // 内容のuseState の定義
  const [text, setText] = useState('');
  // 予定のリストのuseState の定義
  const [plans, setPlans] = useState([]);

  // バックエンドのbaseurl
  const WEB_API_URL = 'http://127.0.0.1:5000';

  // 日付入力フィールドの値が変更を更新
  const handleDateChange = useCallback((e) => {
    setDate(e.target.value);
  }, [setDate]);

  // テキスト入力フィールドの値が変更を更新
  const handleTextChange = useCallback((e) => {
    setText(e.target.value);
  }, [setText]);

  // /setplan を呼び出す処理
  const callSetPlanApi = () => {
    fetch(`${WEB_API_URL}/setplan`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ date: date, text: text }]),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response)
        }
        return 
      })
      .catch(e => {
        console.error('Error calling:', e);
      });
  };

  // 予定を追加する処理
  const handleAddItem = useCallback(() => {
    // date と text の両方に値がある場合にのみ処理を実行
    if (date && text) {
      // データベースに登録
      callSetPlanApi();
      // 空文字列にリセット
      setDate('');
      // 空文字列にリセット
      setText('');
    }
  }, [date, text, setDate, setText]);

  // カスタムフックが返すオブジェクト
  return {
    WEB_API_URL, // バックエンドのbaseurl
    date, // 現在の日付 state
    text, // 現在のテキスト state
    plans, // 予定のリスト state
    setDate, // date state を更新する関数
    setText, // text state を更新する関数
    setPlans, // plans state を更新する関数
    handleDateChange, // 日付変更イベントハンドラー
    handleTextChange, // テキスト変更イベントハンドラー
    handleAddItem, // 予定追加処理関数
  };
};

// カスタムフック usePlanState をエクスポート
export default usePlanState;