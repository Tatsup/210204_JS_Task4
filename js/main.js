'use strict'
{
  const allDiv = document.getElementById('allDiv');
  
  // 開始ボタンクリック時の処理
  document.getElementById('startButton').addEventListener('click', e => {
    // 取得中の画面表示
    document.getElementById('title').textContent = '取得中';
    document.getElementById('comment').textContent = '少々お待ちください';
    document.getElementById('startButton').remove();
    // APIからJSONデータを取得
    fetch("https://opentdb.com/api.php?amount=10")
    .then(response => {
      return response.json();
    })
    .then(jsonObj => {  
      const currentCorrectCount = 0; // 正解数カウント
      let currentQuizNum = 1; // 初期値
      quiz(jsonObj, currentQuizNum, currentCorrectCount);
    });
  });

  // 解答ボタン生成の関数を定義
  function createQuizButton(textAnswer, correctFlag, quizNum, correctCount, obj) {
    const button = document.createElement('button'); // ボタンの要素ノードを作成
    button.textContent = textAnswer.replace(/&#039;/g, '\'').replace(/&quot;/g, '"'); // 特定文字をおきかえる（gは全ての文字列を検索）
    button.setAttribute('id', correctFlag); // 正解or不正解のidを付与
    // click時の正解カウントUP処理と次の問題へ移る処理を付与
    button.addEventListener('click', e => {
      console.log(e.target.id); // for debug
      if (e.target.id === "correct") {
        correctCount ++ ; // 正解数をカウントUP
      }
      if (quizNum <= 10) {
        quiz(obj, quizNum, correctCount); // 次の問題を表示
      } else {
        quizResult(correctCount); // クイズの結果を表示
      };
    });
    const pButton = document.createElement('p'); // 解答ボタンを縦に並べるためp要素ノードを作成
    pButton.appendChild(button); // pにボタンを追加
    return pButton;
  };

  // 問題の表示
  function quiz(obj, quizNum, correctCount) {
    allDiv.innerHTML = ""; // allDivのHTMLを消去
    const fetchData = obj.results[quizNum - 1]; 
    // タイトル
    const tempTitle = document.createElement('h1');
    tempTitle.textContent = `問題${quizNum}`; // "タイトル"を"問題No"のテキストに変更
    tempTitle.id = 'title'; // id付与
    allDiv.appendChild(tempTitle);
    quizNum ++ ; // 問題No.カウントUP
    // 問題
    const tempComment = document.createElement('p');
    tempComment.textContent = fetchData.question.replace(/&#039;/g, '\'').replace(/&quot;/g, '"'); // 特定文字をおきかえる（gは全ての文字列を検索）
    tempComment.id = 'comment'; // id付与
    allDiv.appendChild(tempComment);
    // ジャンル
    const textCategory = document.createTextNode(`[ジャンル]${fetchData.category}`);
    const category = document.createElement('h3');
    category.appendChild(textCategory);
    allDiv.insertBefore(category, tempComment) // "問題"要素の前に"ジャンル"要素を追加
    // 難易度
    const textDifficulty = document.createTextNode(`[難易度]${fetchData.difficulty}`);
    const difficulty = document.createElement('h3');
    difficulty.appendChild(textDifficulty);
    allDiv.insertBefore(difficulty, tempComment) // "問題"要素の前に"難易度"要素を追加
    // 解答
    const fetchDataSize = fetchData.incorrect_answers.length;
    const answers = [
      { content: fetchData.correct_answer, correctFlag: 'correct' },
    ];
    for (let i = 0; i < fetchDataSize; i++) {
      answers.push({ content: fetchData.incorrect_answers[i], correctFlag: 'incorrect' });
    };
    for (let i = 0; i < fetchDataSize + 1; i++) { // 乱数でランダムに選択肢配置
      const random = Math.floor(Math.random() * (fetchDataSize - i)) // i=0では0-3,i=1では0-2の乱数randomを生成
      const quizButton = createQuizButton(answers[random].content, answers[random].correctFlag, quizNum, correctCount, obj); // ランダムに選んだ解答をボタン作成，正解不正解のidも付与
      allDiv.appendChild(quizButton); // allDivにボタンのp要素を追加
      answers.splice(random, 1); // ボタン表示した解答を削除
    };
  };

  // 結果の表示
  function quizResult(correctCount) {
    allDiv.innerHTML = ""; // allDivのHTMLを消去
    // タイトル
    const tempTitle = document.createElement('h1');
    tempTitle.textContent = `あなたの正解数は${correctCount}です！！`; // "タイトル”を正解数のテキストに変更
    tempTitle.id = 'title'; // id付与
    allDiv.appendChild(tempTitle);
    // コメント
    const tempComment = document.createElement('p');
    tempComment.textContent = "再度チャレンジしたい場合は以下をクリック！！"; // 特定文字をおきかえる（gは全ての文字列を検索）
    tempComment.id = 'comment';// id付与
    allDiv.appendChild(tempComment);
    // クリックボタン
    const button = document.createElement('button'); // ボタンの要素ノードを作成
    const textAnswerButton = document.createTextNode('ホームへ戻る'); // テキストノードを作成
    button.appendChild(textAnswerButton); // ボタンにテキストを貼り付け
    button.addEventListener('click', e => {
      allDiv.innerHTML = ""; // allDivのHTMLを消去
      // タイトル
      const tempTitle = document.createElement('h1');
      tempTitle.textContent = 'ようこそ'; // "タイトル”を正解数のテキストに変更
      tempTitle.id = 'title'; // id付与
      allDiv.appendChild(tempTitle);
      // コメント
      const tempComment = document.createElement('p');
      tempComment.textContent = "以下のボタンをクリック";
      tempComment.id = 'comment';// id付与
      allDiv.appendChild(tempComment);
      // クリックボタン
      const button = document.createElement('button'); // ボタンの要素ノードを作成
      button.textContent = "開始";
      button.id = 'startButton';// id付与
      allDiv.appendChild(button);
      // 開始ボタンクリック時の処理
      document.getElementById('startButton').addEventListener('click', e => {
        // 取得中の画面表示
        document.getElementById('title').textContent = '取得中';
        document.getElementById('comment').textContent = '少々お待ちください';
        document.getElementById('startButton').remove();
        // APIからJSONデータを取得
        fetch("https://opentdb.com/api.php?amount=10")
        .then(response => {
          return response.json();
        })
        .then(jsonObj => {   
          const currentCorrectCount = 0; // 正解数カウント
          let currentQuizNum = 1; // 初期値
          quiz(jsonObj, currentQuizNum, currentCorrectCount);
        });
      });
      
    });
    allDiv.appendChild(button);
    };
  
}