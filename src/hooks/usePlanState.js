import { useState, useCallback } from 'react';

// カスタムフック usePlanState の定義
const usePlanState = () => {
  // 日付のuseState の定義
  const [date, setDate] = useState('');
  // 内容のuseState の定義
  const [text, setText] = useState('');
  // 日付と内容を合わせたItemのuseState の定義
  const [items, setItems] = useState([]);

  // 日付入力フィールドの値が変更を更新
  const handleDateChange = useCallback((e) => {
    setDate(e.target.value);
  }, [setDate]);

  // テキスト入力フィールドの値が変更を更新
  const handleTextChange = useCallback((e) => {
    setText(e.target.value);
  }, [setText]);

  // 予定を追加する処理
  const handleAddItem = useCallback(() => {
    // date と text の両方に値がある場合にのみ処理を実行
    if (date && text) {
      // setItems 関数を使用して、items 配列に新しい予定オブジェクトを追加
      setItems((prevItems) => [...prevItems, { date, text }]);
      // 空文字列にリセット
      setDate('');
      // 空文字列にリセット
      setText('');
    }
  }, [date, text, setItems, setDate, setText]);

  // カスタムフックが返すオブジェクト
  return {
    date, // 現在の日付 state
    text, // 現在のテキスト state
    items, // 予定のリスト state
    setDate, // date state を更新する関数
    setText, // text state を更新する関数
    setItems, // items state を更新する関数
    handleDateChange, // 日付変更イベントハンドラー
    handleTextChange, // テキスト変更イベントハンドラー
    handleAddItem, // 予定追加処理関数
  };
};

// カスタムフック usePlanState をエクスポート
export default usePlanState;