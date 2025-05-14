import React, { useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button
} from '@mui/material';
import usePlanState from '../hooks/usePlanState';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Plan コンポーネントの定義
const EditPlan = () => {
  // usePlanState フックから必要な状態と関数を取得
  const {
    WEB_API_URL, // バックエンドのbaseurl
    date, // 選択された日付
    text, // 入力された予定のテキスト
    setDate, // date state を更新する関数
    setText, // text state を更新する関数
    handleDateChange, // 日付が変更された時のハンドラー
    handleTextChange, // テキストが変更された時のハンドラー
  } = usePlanState();

  // 遷移時に受け取ったidを取得
  const [searchParams] = useSearchParams();
  const eventIdFromParams = searchParams.get('id');

  // 選択した予定取得API呼び出し
  const callGetPlanApi = useCallback(() => {
    fetch(`${WEB_API_URL}/getplan`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ id: eventIdFromParams }]),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response)
      }
      return response.json();
    })
    .then(data => {
      setDate(data.start_date)
      setText(data.plan_text)
    })
    .catch(e => {
      console.error('Error calling:', e);
    });
  }, [WEB_API_URL]);

  // 予定削除API呼び出し
  const callDeletePlanApi = useCallback( () => {
    fetch(`${WEB_API_URL}/deleteplan`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ id: eventIdFromParams }]),
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
  }, [WEB_API_URL]);

  // 予定修正API呼び出し
  const callEditPlanApi = useCallback( () => {
    fetch(`${WEB_API_URL}/editplan`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ id: eventIdFromParams, date: date, text: text}]),
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
  }, [date, text]);

  useEffect(() => {
    // 選択した予定取得API呼び出し
    callGetPlanApi();
  }, [callGetPlanApi]);

  // インスタンスを作成（ページ遷移のため）
  const navigate = useNavigate();
  
  // 「修正」ボタンがクリックされた時の処理
  const handleEditItem = () => {
    // データベースの予定修正
    callEditPlanApi()
    // "/" パス（カレンダー）に遷移
    navigate('/');
  };

  // 「削除」ボタンがクリックされた時の処理
  const handleDeleteItem = () => {
    // データベースから予定を削除
    callDeletePlanApi();
    // "/" パス（カレンダー）に遷移
    navigate('/');
  };

  // EditPlan コンポーネントのレンダリング
  return (
    <Container maxWidth="sm">
      {/* 見出しを表示 */}
      <Typography variant="h4" component="h1" gutterBottom>
        予定編集
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
      {/* 修正ボタン */}
      <Button variant="contained" color="primary" onClick={handleEditItem}>
        修正
      </Button>
      {/* 削除ボタン */}
      <Button variant="contained" color="error" onClick={handleDeleteItem}>
        削除
      </Button>
    </Container>
  );
}

// EditPlan コンポーネントをエクスポート
export default EditPlan;