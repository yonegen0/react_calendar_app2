import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button
} from '@mui/material';
import usePlanState from '../hooks/usePlanState';
import { useNavigate, useSearchParams } from 'react-router-dom';

// AddPlan コンポーネントの定義
const AddPlan = () => {
  // usePlanState フックから必要な状態と関数を取得
  const {
    date, // 選択された日付
    text, // 入力された予定のテキスト
    setDate, // date state を更新する関数
    handleDateChange, // 日付が変更された時のハンドラー
    handleTextChange, // テキストが変更された時のハンドラー
    handleAddItem: addItemToState, // カスタムフックの handleAddItem 関数を addItemToState という別名で受け取る
  } = usePlanState();

  // 遷移時に受け取ったdateを取得
  const [searchParams] = useSearchParams();
  const dateFromParams = searchParams.get('date');

  useEffect(() => {
    // 遷移時に受け取ったdateを設定
    if (dateFromParams) {
      setDate(dateFromParams)
    }
  }, [dateFromParams]);

  // インスタンスを作成（ページ遷移のため）
  const navigate = useNavigate();
  
  // 「追加」ボタンがクリックされた時の処理
  const handleAddItem = () => {
    // 状態を更新
    addItemToState();
    // "/" パス（カレンダー）に遷移
    navigate('/');
  };

  // AddPlan コンポーネントのレンダリング
  return (
    <Container maxWidth="sm">
      {/* 見出しを表示 */}
      <Typography variant="h4" component="h1" gutterBottom>
        予定追加
      </Typography>
      {/* 日付入力フィールド */}
      <TextField
        label="日付"
        type="date" // タイプを date に設定して日付ピッカーを表示
        fullWidth // 親要素の幅いっぱいに広げる
        margin="normal" // 上下の余白を追加
        value={date} // 現在の日付の状態をバインド
        onChange={handleDateChange} // 日付が変更された時のハンドラーを設定
      />
      {/* 内容入力フィールド */}
      <TextField
        label="内容"
        multiline // 複数行入力可能にする
        rows={4} // 初期表示の行数を4行に設定
        fullWidth // 親要素の幅いっぱいに広げる
        margin="normal" // 上下の余白を追加
        value={text} // 現在のテキストの状態をバインド
        onChange={handleTextChange} // テキストが変更された時のハンドラーを設定
      />
      {/* 追加ボタン */}
      <Button variant="contained" color="primary" onClick={handleAddItem}>
        追加
      </Button>
    </Container>
  );
}

// AddPlan コンポーネントをエクスポート
export default AddPlan;